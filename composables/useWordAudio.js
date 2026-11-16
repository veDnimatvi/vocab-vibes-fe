// Phát âm từ tiếng Anh.
//
// Nguồn audio (thử lần lượt, link ghép trực tiếp - KHÔNG cần gọi API lấy link trước):
//  1. Youdao dictvoice giọng Mỹ (~0.5s, có cả cụm từ)
//  2. Youdao dictvoice giọng Anh
//  3. Web Speech API (speechSynthesis) của trình duyệt - không cần mạng
// (Google Translate TTS nhanh hơn nhưng trả 404 khi request có Referer từ site khác,
//  mà thẻ <audio> trong trình duyệt luôn gửi Referer -> không dùng được.)
//
// Cache (3 tầng):
//  1. audioCache (Map word -> Promise<Audio|null>): mp3 đã tải trong bộ nhớ của trang,
//     phát lại là phát ngay, tránh tải trùng khi đang tải dở. Mất khi reload.
//  2. Service Worker (workbox runtimeCaching trong nuxt.config.ts, cache "word-audio"):
//     lưu file mp3 vào Cache Storage, CacheFirst 1 năm => reload/mở lại trình duyệt
//     vẫn lấy từ máy, không cần mạng.
//  3. localStorage (MISS_CACHE_KEY): danh sách từ Youdao KHÔNG có audio (7 ngày)
//     => đi thẳng sang speechSynthesis, không phải chờ request lỗi.

const LOAD_TIMEOUT = 4000;
const MISS_CACHE_KEY = "vv_audio_miss_v1";
const MISS_TTL = 7 * 24 * 60 * 60 * 1000;
const audioCache = new Map();
let missCache = null; // { word: timestamp }
let currentAudio = null;

const normalize = (word) => (word || "").trim().toLowerCase();

const getMissCache = () => {
  if (missCache) return missCache;
  missCache = {};
  try {
    const raw = JSON.parse(localStorage.getItem(MISS_CACHE_KEY) || "{}");
    const now = Date.now();
    for (const [k, ts] of Object.entries(raw)) {
      if (now - ts < MISS_TTL) missCache[k] = ts;
    }
    localStorage.removeItem("vv_audio_cache_v1"); // dọn cache của bản cũ
  } catch (error) {}
  return missCache;
};

const markMiss = (key) => {
  // Offline thì không đánh dấu (lỗi do mạng, không phải do thiếu audio)
  if (typeof navigator !== "undefined" && !navigator.onLine) return;
  getMissCache()[key] = Date.now();
  try {
    localStorage.setItem(MISS_CACHE_KEY, JSON.stringify(missCache));
  } catch (error) {}
};

const getSources = (word) => {
  const q = encodeURIComponent(word);
  return [
    `https://dict.youdao.com/dictvoice?audio=${q}&type=2`, // type=2: giọng Mỹ
    `https://dict.youdao.com/dictvoice?audio=${q}&type=1`, // type=1: giọng Anh
  ];
};

// Tải 1 nguồn, resolve Audio khi phát được (canplay), null nếu lỗi/timeout
const loadSource = (url) =>
  new Promise((resolve) => {
    const audio = new Audio();
    let done = false;
    const finish = (result) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      audio.oncanplay = null;
      audio.onerror = null;
      resolve(result);
    };
    const timer = setTimeout(() => finish(null), LOAD_TIMEOUT);
    audio.oncanplay = () => finish(audio);
    audio.onerror = () => finish(null);
    audio.preload = "auto";
    audio.src = url;
    audio.load();
  });

const loadAudio = (word) => {
  const key = normalize(word);
  if (!key || typeof window === "undefined") return Promise.resolve(null);
  if (audioCache.has(key)) return audioCache.get(key);
  if (getMissCache()[key]) return Promise.resolve(null);
  const promise = (async () => {
    for (const url of getSources(key)) {
      const audio = await loadSource(url);
      if (audio) return audio;
    }
    audioCache.delete(key);
    markMiss(key);
    return null;
  })();
  audioCache.set(key, promise);
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

  // Tải trước mp3 (gọi khi hover, hoặc cho từ sắp hiện)
  const prefetch = (word) => {
    if (word) loadAudio(word);
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

    loadingId.value = id;
    const audio = await loadAudio(word);
    if (loadingId.value === id) loadingId.value = null;

    if (audio) {
      try {
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
