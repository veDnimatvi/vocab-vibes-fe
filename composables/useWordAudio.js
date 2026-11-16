// Phát âm từ tiếng Anh.
// Nguồn: Free Dictionary API (https://dictionaryapi.dev) - miễn phí, không cần key.
// Fallback: Web Speech API (speechSynthesis) của trình duyệt.
//
// Cơ chế cache (3 tầng, dùng chung cho mọi trang):
//  1. urlCache (Map word -> url|null), lưu vào localStorage => reload trang vẫn còn,
//     không phải gọi lại API.
//  2. audioElCache (Map url -> Audio) => file mp3 đã tải sẵn trong bộ nhớ, phát ngay.
//  3. pendingFetch (Map word -> Promise) => tránh gọi API trùng khi đang tải dở.

const AUDIO_CACHE_KEY = "vv_audio_cache_v1";
const urlCache = new Map();
const audioElCache = new Map();
const pendingFetch = new Map();
let cacheLoaded = false;
let currentAudio = null;

const normalize = (word) => (word || "").trim().toLowerCase();

const loadCache = () => {
  if (cacheLoaded || typeof window === "undefined") return;
  cacheLoaded = true;
  try {
    const raw = localStorage.getItem(AUDIO_CACHE_KEY);
    if (raw) {
      Object.entries(JSON.parse(raw)).forEach(([k, v]) => urlCache.set(k, v));
    }
  } catch (error) {}
};

const saveCache = () => {
  try {
    localStorage.setItem(
      AUDIO_CACHE_KEY,
      JSON.stringify(Object.fromEntries(urlCache)),
    );
  } catch (error) {}
};

const getAudioEl = (url) => {
  if (!url) return null;
  let audio = audioElCache.get(url);
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    audio.src = url;
    audio.load();
    audioElCache.set(url, audio);
  }
  return audio;
};

// Trả về url | null (không có audio) | undefined (lỗi mạng/server -> không cache)
const requestAudioUrl = async (key) => {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`,
    );
    if (res.status === 404) return null;
    if (!res.ok) return undefined;
    const data = await res.json();
    const withAudio = data
      .flatMap((entry) => entry.phonetics || [])
      .filter((p) => p.audio);
    // Ưu tiên giọng Mỹ (-us), sau đó Anh (-uk), rồi bất kỳ
    const pick =
      withAudio.find((p) => p.audio.includes("-us.")) ||
      withAudio.find((p) => p.audio.includes("-uk.")) ||
      withAudio[0];
    return pick?.audio || null;
  } catch (error) {
    return undefined;
  }
};

const fetchAudioUrl = (word) => {
  loadCache();
  const key = normalize(word);
  if (urlCache.has(key)) return Promise.resolve(urlCache.get(key));
  if (pendingFetch.has(key)) return pendingFetch.get(key);
  const promise = requestAudioUrl(key).then((url) => {
    if (url !== undefined) {
      urlCache.set(key, url);
      saveCache();
    }
    pendingFetch.delete(key);
    return url ?? null;
  });
  pendingFetch.set(key, promise);
  return promise;
};

const stopAll = () => {
  currentAudio?.pause();
  currentAudio = null;
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
};

export const useWordAudio = () => {
  const loadingId = ref(null);
  const playingId = ref(null);

  const isCached = (word) => {
    loadCache();
    return urlCache.has(normalize(word));
  };

  // Tải trước url + mp3 (gọi khi hover, hoặc cho từ sắp hiện)
  const prefetch = async (word) => {
    if (!word) return;
    const url = await fetchAudioUrl(word);
    getAudioEl(url);
  };

  const speakWithBrowser = (word, id) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return false;
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.onend = () => {
      if (playingId.value === id) playingId.value = null;
    };
    playingId.value = id;
    window.speechSynthesis.speak(utter);
    return true;
  };

  // Phát âm 1 từ. id dùng để hiển thị trạng thái loading/playing trên UI.
  // Trả về false nếu không phát được.
  const play = async (word, id = word) => {
    if (!word) return false;
    stopAll();
    playingId.value = null;

    if (!isCached(word)) loadingId.value = id;
    const url = await fetchAudioUrl(word);
    if (loadingId.value === id) loadingId.value = null;

    if (url) {
      try {
        const audio = getAudioEl(url);
        audio.currentTime = 0;
        currentAudio = audio;
        playingId.value = id;
        audio.onended = () => {
          if (playingId.value === id) playingId.value = null;
        };
        await audio.play();
        return true;
      } catch (error) {
        playingId.value = null;
        // NotAllowedError = trình duyệt chặn autoplay -> không fallback
        if (error?.name === "NotAllowedError") return false;
      }
    }
    return speakWithBrowser(word, id);
  };

  onBeforeUnmount(stopAll);

  return { play, prefetch, stop: stopAll, loadingId, playingId };
};
