// Islamic Resource Data for Alif Digital

export interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  englishTitle: string;
  englishText: string;
  manglishText: string;
  kannadaText: string;
}

export interface SwalathItem {
  id: string;
  name: string;
  arabicText: string;
  transliteration: string;
  benefits: string;
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  type: "Meccan" | "Medinan";
  versesCount: number;
  juz: number;
  arabicText: string[]; // actual lines/verses for the Quranic pages look
}

export interface DuaItem {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
}

export interface MoulidChapter {
  title: string;
  arabicText: string;
  transliteration: string;
}

export interface MoulidItem {
  id: string;
  name: string;
  chapters: MoulidChapter[];
}

export interface RathibSection {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
  count: string;
}

// 1. ALL 114 SURAHS INDEX & SELECTED TEXTS
export const QURAN_SURAHS: QuranSurah[] = [
  {
    number: 1,
    name: "الفاتحة",
    englishName: "Al-Fatihah",
    type: "Meccan",
    versesCount: 7,
    juz: 1,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      "الرَّحْمَٰنِ الرَّحِيمِ",
      "مَالِكِ يَوْمِ الدِّينِ",
      "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ]
  },
  {
    number: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    type: "Medinan",
    versesCount: 286,
    juz: 1,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الم ﴿١﴾ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ ﴿٢﴾",
      "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ﴿٣﴾",
      "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ﴿٤﴾",
      "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ﴿٥﴾",
      "إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ﴿٦﴾",
      "خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ ﴿٧﴾"
    ]
  },
  {
    number: 3,
    name: "آل عمران",
    englishName: "Ali 'Imran",
    type: "Medinan",
    versesCount: 200,
    juz: 3,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الم ﴿١﴾ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ﴿٢﴾",
      "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ ﴿٣﴾",
      "مِن قَبْلُ هُدًى لِّلنَّاسِ وَأَنزَلَ الْفُرْقَانَ ۗ إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ ۗ وَاللَّهُ عَزِيزٌ ذُو انتِقَامٍ ﴿٤﴾"
    ]
  },
  {
    number: 4,
    name: "النساء",
    englishName: "An-Nisa",
    type: "Medinan",
    versesCount: 176,
    juz: 4,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا ﴿١﴾"
    ]
  },
  {
    number: 18,
    name: "الكهف",
    englishName: "Al-Kahf",
    type: "Meccan",
    versesCount: 110,
    juz: 15,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا ۜ ﴿١﴾",
      "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا ﴿٢﴾ مَّاكِثِينَ فِيهِ أَبَدًا ﴿٣﴾",
      "وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا ﴿٤﴾ مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا ﴿٥﴾"
    ]
  },
  {
    number: 36,
    name: "يس",
    englishName: "Ya-Sin",
    type: "Meccan",
    versesCount: 83,
    juz: 22,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ﴿٤﴾ تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ﴿٥﴾",
      "لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ﴿٦﴾ لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ﴿٧﴾",
      "إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ ﴿٨﴾ وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ ﴿٩﴾",
      "وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ﴿١٠﴾ إِنَّمَا تُنذِرُ مَنِ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ ﴿١١﴾"
    ]
  },
  {
    number: 55,
    name: "الرحمن",
    englishName: "Ar-Rahman",
    type: "Meccan",
    versesCount: 78,
    juz: 27,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الرَّحْمَٰنُ ﴿١﴾ عَلَّمَ الْقُرْآنَ ﴿٢﴾ خَلَقَ الْإِنسَانَ ﴿٣﴾ عَلَّمَهُ الْبَيَانَ ﴿٤﴾",
      "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ ﴿٥﴾ وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ ﴿٦﴾ وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ ﴿٧﴾",
      "أَلَّا تَطْغَوْا فِي الْمِيزَانِ ﴿٨﴾ وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ ﴿٩﴾ وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ ﴿١٠﴾",
      "فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ ﴿١١﴾ وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ ﴿١٢﴾ فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ﴿١٣﴾"
    ]
  },
  {
    number: 56,
    name: "الواقعة",
    englishName: "Al-Waqi'ah",
    type: "Meccan",
    versesCount: 96,
    juz: 27,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "إِذَا وَقَعَتِ الْوَاقِعَةُ ﴿١﴾ لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ ﴿٢﴾ خَافِضَةٌ رَّافِعَةٌ ﴿٣﴾",
      "إِذَا رُجَّتِ الْأَرْضُ رَجًّا ﴿٤﴾ وَبُسَّتِ الْجِبَالُ بَسًّا ﴿٥﴾ فَكَانَتْ هَبَاءً مُّنبَثًّا ﴿٦﴾",
      "وَكُنتُمْ أَزْوَاجًا ثَلَاثَةً ﴿٧﴾ فَأَصْحَابُ الْمَيْمَنَةِ مَا أَصْحَابُ الْمَيْمَنَةِ ﴿٨﴾ وَأَصْحَابُ الْمَشْأَمَةِ مَا أَصْحَابُ الْمَشْأَمَةِ ﴿٩﴾",
      "وَالسَّابِقُونَ السَّابِقُونَ ﴿١٠﴾ أُولَٰئِكَ الْمُقَرَّبُونَ ﴿١١﴾ فِي جَنَّاتِ النَّعِيمِ ﴿١٢﴾"
    ]
  },
  {
    number: 67,
    name: "الملك",
    englishName: "Al-Mulk",
    type: "Meccan",
    versesCount: 30,
    juz: 29,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾",
      "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ ﴿٢﴾",
      "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ ﴿٣﴾ ثُمَّ ارْجِعِ الْبَصَرَتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ ﴿٤﴾"
    ]
  },
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    type: "Meccan",
    versesCount: 4,
    juz: 30,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾"
    ]
  },
  {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    type: "Meccan",
    versesCount: 5,
    juz: 30,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾",
      "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾"
    ]
  },
  {
    number: 114,
    name: "الناس",
    englishName: "An-Nas",
    type: "Meccan",
    versesCount: 6,
    juz: 30,
    arabicText: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾",
      "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾"
    ]
  }
];

// Helper to fill other Surahs listing without filling code size too much
export const ALL_114_SURAH_LIST = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", verses: 7, type: "Meccan", juz: 1 },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", verses: 286, type: "Medinan", juz: 1 },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", verses: 200, type: "Medinan", juz: 3 },
  { number: 4, name: "النساء", englishName: "An-Nisa", verses: 176, type: "Medinan", juz: 4 },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", verses: 120, type: "Medinan", juz: 6 },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", verses: 165, type: "Meccan", juz: 7 },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", verses: 206, type: "Meccan", juz: 8 },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", verses: 75, type: "Medinan", juz: 9 },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", verses: 129, type: "Medinan", juz: 10 },
  { number: 10, name: "يونس", englishName: "Yunus", verses: 109, type: "Meccan", juz: 11 },
  { number: 11, name: "هود", englishName: "Hud", verses: 123, type: "Meccan", juz: 11 },
  { number: 12, name: "يوسف", englishName: "Yusuf", verses: 111, type: "Meccan", juz: 12 },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", verses: 43, type: "Medinan", juz: 13 },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", verses: 52, type: "Meccan", juz: 13 },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", verses: 99, type: "Meccan", juz: 14 },
  { number: 16, name: "النحل", englishName: "An-Nahl", verses: 128, type: "Meccan", juz: 14 },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", verses: 111, type: "Meccan", juz: 15 },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", verses: 110, type: "Meccan", juz: 15 },
  { number: 19, name: "مريم", englishName: "Maryam", verses: 98, type: "Meccan", juz: 16 },
  { number: 20, name: "طه", englishName: "Ta-Ha", verses: 135, type: "Meccan", juz: 16 },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", verses: 112, type: "Meccan", juz: 17 },
  { number: 22, name: "الحج", englishName: "Al-Hajj", verses: 78, type: "Medinan", juz: 17 },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", verses: 118, type: "Meccan", juz: 18 },
  { number: 24, name: "النور", englishName: "An-Nur", verses: 64, type: "Medinan", juz: 18 },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", verses: 77, type: "Meccan", juz: 18 },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", verses: 227, type: "Meccan", juz: 19 },
  { number: 27, name: "النمل", englishName: "An-Naml", verses: 93, type: "Meccan", juz: 19 },
  { number: 28, name: "القصص", englishName: "Al-Qasas", verses: 88, type: "Meccan", juz: 20 },
  { number: 29, name: "العنكبوت", englishName: "Al-'Ankabut", verses: 69, type: "Meccan", juz: 20 },
  { number: 30, name: "الروم", englishName: "Ar-Rum", verses: 60, type: "Meccan", juz: 21 },
  { number: 31, name: "لقمان", englishName: "Luqman", verses: 34, type: "Meccan", juz: 21 },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", verses: 30, type: "Meccan", juz: 21 },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", verses: 73, type: "Medinan", juz: 21 },
  { number: 34, name: "سبأ", englishName: "Saba", verses: 54, type: "Meccan", juz: 22 },
  { number: 35, name: "فاطر", englishName: "Fatir", verses: 45, type: "Meccan", juz: 22 },
  { number: 36, name: "يس", englishName: "Ya-Sin", verses: 83, type: "Meccan", juz: 22 },
  { number: 37, name: "الصافات", englishName: "As-Saffat", verses: 182, type: "Meccan", juz: 23 },
  { number: 38, name: "ص", englishName: "Sad", verses: 88, type: "Meccan", juz: 23 },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", verses: 75, type: "Meccan", juz: 23 },
  { number: 40, name: "غافر", englishName: "Ghafir", verses: 85, type: "Meccan", juz: 24 },
  { number: 41, name: "فصلت", englishName: "Fussilat", verses: 54, type: "Meccan", juz: 24 },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", verses: 53, type: "Meccan", juz: 25 },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", verses: 89, type: "Meccan", juz: 25 },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", verses: 59, type: "Meccan", juz: 25 },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", verses: 37, type: "Meccan", juz: 25 },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", verses: 35, type: "Meccan", juz: 26 },
  { number: 47, name: "محمد", englishName: "Muhammad", verses: 38, type: "Medinan", juz: 26 },
  { number: 48, name: "الفتح", englishName: "Al-Fath", verses: 29, type: "Medinan", juz: 26 },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", verses: 18, type: "Medinan", juz: 26 },
  { number: 50, name: "ق", englishName: "Qaf", verses: 45, type: "Meccan", juz: 26 },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", verses: 60, type: "Meccan", juz: 26 },
  { number: 52, name: "الطور", englishName: "At-Tur", verses: 49, type: "Meccan", juz: 27 },
  { number: 53, name: "النجم", englishName: "An-Najm", verses: 62, type: "Meccan", juz: 27 },
  { number: 54, name: "القمر", englishName: "Al-Qamar", verses: 55, type: "Meccan", juz: 27 },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", verses: 78, type: "Meccan", juz: 27 },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", verses: 96, type: "Meccan", juz: 27 },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", verses: 29, type: "Medinan", juz: 27 },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadilah", verses: 22, type: "Medinan", juz: 28 },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", verses: 24, type: "Medinan", juz: 28 },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", verses: 13, type: "Medinan", juz: 28 },
  { number: 61, name: "الصف", englishName: "As-Saff", verses: 14, type: "Medinan", juz: 28 },
  { number: 62, name: "الجمعة", englishName: "Al-Jumua", verses: 11, type: "Medinan", juz: 28 },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", verses: 11, type: "Medinan", juz: 28 },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", verses: 18, type: "Medinan", juz: 28 },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", verses: 12, type: "Medinan", juz: 28 },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", verses: 12, type: "Medinan", juz: 28 },
  { number: 67, name: "الملك", englishName: "Al-Mulk", verses: 30, type: "Meccan", juz: 29 },
  { number: 68, name: "القلم", englishName: "Al-Qalam", verses: 52, type: "Meccan", juz: 29 },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", verses: 52, type: "Meccan", juz: 29 },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", verses: 44, type: "Meccan", juz: 29 },
  { number: 71, name: "نوح", englishName: "Nuh", verses: 28, type: "Meccan", juz: 29 },
  { number: 72, name: "الجن", englishName: "Al-Jinn", verses: 28, type: "Meccan", juz: 29 },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", verses: 20, type: "Meccan", juz: 29 },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", verses: 56, type: "Meccan", juz: 29 },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", verses: 40, type: "Meccan", juz: 29 },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", verses: 31, type: "Medinan", juz: 29 },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", verses: 50, type: "Meccan", juz: 29 },
  { number: 78, name: "النبأ", englishName: "An-Naba", verses: 40, type: "Meccan", juz: 30 },
  { number: 79, name: "النازعات", englishName: "An-Naziat", verses: 46, type: "Meccan", juz: 30 },
  { number: 80, name: "عبس", englishName: "Abasa", verses: 42, type: "Meccan", juz: 30 },
  { number: 81, name: "التكوير", englishName: "At-Takwir", verses: 29, type: "Meccan", juz: 30 },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", verses: 19, type: "Meccan", juz: 30 },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", verses: 36, type: "Meccan", juz: 30 },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", verses: 25, type: "Meccan", juz: 30 },
  { number: 85, name: "البروج", englishName: "Al-Buruj", verses: 22, type: "Meccan", juz: 30 },
  { number: 86, name: "الطارق", englishName: "At-Tariq", verses: 17, type: "Meccan", juz: 30 },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", verses: 19, type: "Meccan", juz: 30 },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", verses: 26, type: "Meccan", juz: 30 },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", verses: 30, type: "Meccan", juz: 30 },
  { number: 90, name: "البلد", englishName: "Al-Balad", verses: 20, type: "Meccan", juz: 30 },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", verses: 15, type: "Meccan", juz: 30 },
  { number: 92, name: "الليل", englishName: "Al-Layl", verses: 21, type: "Meccan", juz: 30 },
  { number: 93, name: "الضحى", englishName: "Ad-Duha", verses: 11, type: "Meccan", juz: 30 },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", verses: 8, type: "Meccan", juz: 30 },
  { number: 95, name: "التين", englishName: "At-Tin", verses: 8, type: "Meccan", juz: 30 },
  { number: 96, name: "العلق", englishName: "Al-Alaq", verses: 19, type: "Meccan", juz: 30 },
  { number: 97, name: "القدر", englishName: "Al-Qadr", verses: 5, type: "Meccan", juz: 30 },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", verses: 8, type: "Medinan", juz: 30 },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", verses: 8, type: "Medinan", juz: 30 },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", verses: 11, type: "Meccan", juz: 30 },
  { number: 101, name: "القارعة", englishName: "Al-Qariah", verses: 11, type: "Meccan", juz: 30 },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", verses: 8, type: "Meccan", juz: 30 },
  { number: 103, name: "العصر", englishName: "Al-Asr", verses: 3, type: "Meccan", juz: 30 },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", verses: 9, type: "Meccan", juz: 30 },
  { number: 105, name: "الفيل", englishName: "Al-Fil", verses: 5, type: "Meccan", juz: 30 },
  { number: 106, name: "قريش", englishName: "Quraysh", verses: 4, type: "Meccan", juz: 30 },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", verses: 7, type: "Meccan", juz: 30 },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", verses: 3, type: "Meccan", juz: 30 },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", verses: 6, type: "Meccan", juz: 30 },
  { number: 110, name: "النصر", englishName: "An-Nasr", verses: 3, type: "Medinan", juz: 30 },
  { number: 111, name: "المسد", englishName: "Al-Masad", verses: 5, type: "Meccan", juz: 30 },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", verses: 4, type: "Meccan", juz: 30 },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", verses: 5, type: "Meccan", juz: 30 },
  { number: 114, name: "الناس", englishName: "An-Nas", verses: 6, type: "Meccan", juz: 30 }
];

// 2. MORE USEFUL SWALATH
export const SWALATH_ITEMS: SwalathItem[] = [
  {
    id: "nariya",
    name: "Swalathun Nariya (സ്വലാത്തുന്നാരിയ്യ)",
    arabicText: "اللَّهُمَّ صَلِّ صَلاَةً كَامِلَةً وَسَلِّمْ سَلاَمًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِيمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ وَعَلَى آلِهِ وَصَحْبِهِ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ",
    transliteration: "Allahumma salli salatan kamilatan wa sallim salaman tamman 'ala sayyidina Muhammadinil-ladhi tanhallu bihil-'uqad, wa tanfariju bihil-kurab, wa tuqda bihil-hawa'ij, wa tunalu bihir-ragha'ib, wa husnul-khawatim, wa yustasqal-ghamamu bi-wajhihil-karim, wa 'ala alihi wa sahbihi fi kulli lamhatin wa nafasin bi-'adadi kulli ma'lumin lak.",
    benefits: "Extremely beneficial for overcoming difficult trials, obtaining success, and solving severe life blockages. Traditionally recited 4444 times in congregation for critical requirements."
  },
  {
    id: "fatih",
    name: "Swalathul Fatih (സ്വലാത്തുൽ ഫാതിഹ്)",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ",
    transliteration: "Allahumma salli 'ala sayyidina Muhammadinil-fatihi lima ughliqa wal-khatimi lima sabaqa, nasiril-haqqi bil-haqqi wal-hadi ila siratikal-mustaqim, wa 'ala alihi haqqa qadrihi wa miqdarihil-'adhim.",
    benefits: "Opens closed doors of livelihood, mental capacity, and spiritual wisdom. Earns massive spiritual reward equivalent to thousands of general supplications."
  },
  {
    id: "shifa",
    name: "Swalathut Tibbiyyah / Shifa (സ്വലാത്തുശ്ശفاء)",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا وَعَافِيَةِ الأَبْدَانِ وَشِفَائِهَا وَنُورِ الأَبْصَارِ وَضِيَائِهَا وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
    transliteration: "Allahumma salli 'ala sayyidina Muhammadin tibbil-qulubi wa dawa'iha, wa 'afiyatil-abdani wa shifa'iha, wa nuril-absari wa diya'iha, wa 'ala alihi wa sahbihi wa sallim.",
    benefits: "Known as the Shifa (healing) swalath. It provides spiritual and physical healing, cures ailments, and brings peace to an anxious heart."
  },
  {
    id: "ibrahimiyyah",
    name: "Swalathul Ibrahimiyyah (സ്വലാത്തുൽ ഇബ്രാഹീമിയ്യ)",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidum Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidum Majid.",
    benefits: "The ultimate and most authentic Swalath, taught directly by Prophet Muhammad (SAW) himself. Compulsory in the daily Tashahhud of Namaz."
  },
  {
    id: "tunjina",
    name: "Swalathut Tunjina / Munajiyyah (സ്വലാത്തുത്തുൻജീന)",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلاَةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الأَهْوَالِ وَالآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ",
    transliteration: "Allahumma salli 'ala sayyidina Muhammadin salatan tunjina biha min jami'il-ahwali wal-afat, wa taqdi lana biha jami'al-hajat, wa tutahhiruna biha min jami'is-sayyi'at, wa tarfa'una biha 'indaka a'lad-darajat, wa tuballighuna biha aqsal-ghayati min jami'il-khayrati fil-hayati wa ba'dal-mamat.",
    benefits: "Saves the reciter from sudden calamities, natural disasters, plagues, and spiritual pitfalls. Known as the 'Salutation of Deliverance'."
  },
  {
    id: "tajiyyah",
    name: "Swalathut Tajiyyah (സ്വലാത്തുത്താജ്)",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَاحِبِ التَّاجِ وَالْمِعْرَاجِ وَالْبُرَاقِ وَالْعَلَمِ، دَافِعِ الْبَلاَءِ وَالْوَبَاءِ وَالْقَحْطِ وَالْمَرَضِ وَالأَلَمِ",
    transliteration: "Allahumma salli 'ala sayyidina Muhammadin sahibi-ttaji wal-mi'raji wal-buraqi wal-'alam, dafi'il-bala'i wal-waba'i wal-qahti wal-maradi wal-alam...",
    benefits: "Excellent protection against dark forces, evil eye, and chronic sickness. Adds barakah to business, household, and health."
  }
];

// 3. DAILY USEFUL DUAS OF ALL NAMAZ & COMMONS
export const NAMAZ_DUAS: DuaItem[] = [
  {
    id: "dua_fajr",
    title: "Dua After Fajr Prayer (ഫജ്‌ർ നിസ്കാര ശേഷമുള്ള ദുആ)",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا. اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (٧ مرات)",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan. Allahumma ajirni minan-nar (7 times)."
  },
  {
    id: "qunut",
    title: "Dua Al-Qunut in Fajr (ഫജ്‌റിലെ ഖുനൂത് ദുആ)",
    arabicText: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَىٰ عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَن وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَىٰ مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ",
    transliteration: "Allahummahdini fiman hadayt, wa 'afini fiman 'afayt, wa tawallani fiman tawallayt, wa barik li fima a'tayt, wa qini sharra ma qadayt, fa-innaka taqdi wa la yuqda 'alayk, wa innahu la yadhillu man walayt, wa la ya'izzu man 'adayt, tabarakta Rabbana wa ta'alayt, falakal-hamdu 'ala ma qadayt, astaghfiruka wa atubu ilayk. Wa sallallahu 'ala sayyidina Muhammadinin-nabiyyil-ummiyyi wa 'ala alihi wa sahbihi wa sallam."
  },
  {
    id: "dua_dhuhr",
    title: "Dua After Dhuhr Prayer (ളുഹർ നിസ്കാര ശേഷമുള്ള ദുആ)",
    arabicText: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ. اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik. Allahumma-ghfir li dhunubi waftah li abwaba rahmatik."
  },
  {
    id: "dua_asr",
    title: "Dua After Asr Prayer (അസർ നിസ്കാര ശേഷമുള്ള ദുആ)",
    arabicText: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ (٣ مرات). اللَّهُمَّ يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Astaghfirullahal-'adhim alladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh (3 times). Allahumma ya Muqallibal-qulubi thabbit qalbi 'ala dinik."
  },
  {
    id: "dua_maghrib",
    title: "Dua After Maghrib Prayer (മഗ്‌രിബ് നിസ്കാര ശേഷമുള്ള ദുആ)",
    arabicText: "اللَّهُمَّ هَذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْ لِي. اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (٧ مرات)",
    transliteration: "Allahumma hadha iqbalu laylika wa idbaru naharika wa aswatu du'atika faghfir li. Allahumma ajirni minan-nar (7 times)."
  },
  {
    id: "dua_isha",
    title: "Dua After Isha Prayer (ഇശാ നിസ്കാര ശേഷമുള്ള ദുആ)",
    arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْهَرَمِ، وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
    transliteration: "Allahumma inni a'udhu bika minal-'ajzi wal-kasali, wal-jubni wal-harami, wal-bukhli, wa a'udhu bika min 'adhabil-qabri, wa min fitnatil-mahya wal-mamat."
  },
  {
    id: "dua_parents",
    title: "Dua for Parents (മാതാപിതാക്കൾക്ക് വേണ്ടിയുള്ള ദുആ)",
    arabicText: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbir-hamhuma kama rabbayani saghira."
  },
  {
    id: "dua_success",
    title: "Dua for Success in Dunya & Akhirah (ഇരുലോക വിജയത്തിനായുള്ള ദുആ)",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar."
  },
  {
    id: "dua_protection",
    title: "Dua for Protection Against Harm (വിപത്തുകളിൽ നിന്നുള്ള സംരക്ഷണ ദുആ)",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim."
  },
  {
    id: "dua_anxiety",
    title: "Dua for Relief from Distress / Ayat al-Karimah (പ്രയാസ മോചന ദുആ)",
    arabicText: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minadh-dhalimin."
  },
  {
    id: "dua_azan",
    title: "Dua After Azan (ബാങ്കിന് ശേഷമുള്ള ദുആ)",
    arabicText: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ سَيِّدَنَا مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
    transliteration: "Allahumma Rabba hadhihid-da'watit-tammah, was-salatil-qa'imah, ati sayyidana Muhammadanil-wasilata wal-fadilah, wab'athhu maqaman mahmudal-ladhi wa'adtah."
  },
  {
    id: "dua_knowledge",
    title: "Dua for Increase in Knowledge (അറിവ് വർദ്ധിക്കാനുള്ള ദുആ)",
    arabicText: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma."
  },
  {
    id: "dua_sayyidul_istighfar",
    title: "Sayyidul Istighfar - Ultimate Forgiveness (സയ്യിദുൽ ഇസ്തിഗ്ഫാർ)",
    arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Ant. Khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata't. A'udhu bika min sharri ma sana't, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li, fa-innahu la yaghfiru-dhunuba illa Ant."
  }
];

// 4. RATHIB HADDAD (രാത്തീബ് ഹദ്ദാദ്)
export const RATHIB_HADDAD: RathibSection[] = [
  {
    id: "rh1",
    title: "Al-Fatihah to Imam al-Haddad",
    arabicText: "الْفَاتِحَةُ إِلَى رُوحِ سَيِّدِنَا وَحَبِيبِنَا وَشَفِيعِنَا رَسُولِ اللَّهِ مُحَمَّدِ بْنِ عَبْدِ اللَّهِ، وَآلِهِ وَأَصْحَابِهِ... ثُمَّ إِلَى رُوحِ صَاحِبِ الرَّاتِبِ قُطْبِ الإِرْشَادِ الْحَبِيبِ عَبْدِ اللَّهِ بْنِ عَلَوِيِّ الْحَدَّادِ",
    transliteration: "Al-Fatihah ila ruhi sayyidina wa habibina wa shafi'ina Rasulillah Muhammad bin Abdillah, wa alihi wa sahbihi... thumma ila ruhi sahibir-ratib Qutbil-Irshadi Al-Habib Abdillah bin Alawi Al-Haddad.",
    count: "1 Time"
  },
  {
    id: "rh2",
    title: "Ayat al-Kursi (آية الكرسي)",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa huwal-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnihi. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi-shay'in min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-arda wa la ya'uduhu hifdhuhuma wa Huwal-'Aliyyul-'Adhim.",
    count: "1 Time"
  },
  {
    id: "rh3",
    title: "Litany 1 - Declaration of Faith & Protection",
    arabicText: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu yuhyi wa yumitu wa Huwa 'ala kulli shay'in Qadir.",
    count: "3 Times"
  },
  {
    id: "rh4",
    title: "Litany 2 - Glorification of Allah",
    arabicText: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhanallahi, wal-hamdu lillahi, wa la ilaha illallahu, wallahu Akbar.",
    count: "3 Times"
  },
  {
    id: "rh5",
    title: "Litany 3 - Asking for Acceptance & Forgiveness",
    arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "Subhanallahi wa bi-hamdihi, Subhanallahil-'Adhim.",
    count: "3 Times"
  },
  {
    id: "rh6",
    title: "Litany 4 - Repentance",
    arabicText: "رَبَّنَا اغْفِرْ لَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbana-ghfir lana wa tub 'alayna innaka Antat-Tawwabur-Rahim.",
    count: "3 Times"
  },
  {
    id: "rh7",
    title: "Litany 5 - Salat upon the Prophet",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، اللَّهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ",
    transliteration: "Allahumma salli 'ala Muhammad, Allahumma salli 'alayhi wa sallim.",
    count: "3 Times"
  },
  {
    id: "rh8",
    title: "Litany 6 - Seeking Protection in Divine Words",
    arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.",
    count: "3 Times"
  },
  {
    id: "rh9",
    title: "Litany 7 - Shield Against All Harm",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    count: "3 Times"
  }
];

// 5. MAJLISUNNOOR (മജ്‌ലിസുന്നൂർ)
export const MAJLISUNNOOR: RathibSection[] = [
  {
    id: "mn1",
    title: "Introduction & Spiritual Intention",
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. نَوَيْتُ اَنْ اَقْرَأَ كَلِمَاتِ مَجْلِسِ النُّورِ حُبًّا لِلَّهِ تَعَالَى وَتَعْظِيمًا لِرَسُولِهِ وَتَبَرُّكًا بِاَهْلِ بَدْرٍ وَاُحُدٍ رَضِيَ اللَّهُ عَنْهُمْ",
    transliteration: "Bismillahir-Rahmanir-Rahim. Nawaytu an aqra'a kalimati Majlisinnur hubban lillahi Ta'ala wa ta'dhiman li-Rasulihi wa tabarrukan bi-Ahli Badrin wa Uhudin Radiyallahu 'anhum.",
    count: "1 Time"
  },
  {
    id: "mn2",
    title: "Praise of Badr Companions (അസ്മാഉൽ ബദ്‌രീങ്ങൾ)",
    arabicText: "يَا أَلله يَا رَحْمٰن يَا رَحِيم يَا كَرِيم، سَلِّمْنَا وَانْصُرْنَا بِجَاهِ أَهْلِ الْبَدْرِ الْكِرَامِ... سَيِّدُنَا أَبُو بَكْرٍ الصِّدِّيق رَضِيَ اللَّهُ عَنْهُ، سَيِّدُنَا عُمَرُ بْنُ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ، سَيِّدُنَا عُثْمَانُ بْنُ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ، سَيِّدُنَا عَلِيُّ بْنُ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ...",
    transliteration: "Ya Allah Ya Rahman Ya Rahim Ya Karim, sallimna wan-surna bi-jahi Ahlil-Badril-kiram... Sayyidina Abu Bakr As-Siddiq (RA), Sayyidina Umar bin Al-Khattab (RA), Sayyidina Uthman bin Affan (RA), Sayyidina Ali bin Abi Talib (RA)...",
    count: "Recite with devotion"
  },
  {
    id: "mn3",
    title: "Majlisunnoor Core Supplication (മജ്‌ലിസുന്നൂർ ദുആ)",
    arabicText: "اللَّهُمَّ بِأَهْلِ بَدْرٍ يَا أَلله، ادْفَعْ عَنَّا الْبَلاَءَ وَالْوَبَاءَ وَالأَمْرَاضَ وَالْفِتَنَ. اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا وَاقْضِ لَنَا مَطَالِبَنَا وَأَصْلِحْ أَحْوَالَنَا بِحَقِّ مُحَمَّدٍ وَآلِهِ وَبِجَاهِ شُهَدَاءِ الْبَدْرِ رَضِيَ اللَّهُ عَنْهُمْ",
    transliteration: "Allahumma bi-Ahli Badrin ya Allah, idfa' 'annal-bala'a wal-waba'a wal-amrada wal-fitan. Allahumma-ghfir lana dhunubana waqdi lana matalibana wa aslih ahwalana bi-haqqi Muhammadin wa alihi wa bi-jahi Shuhada'il-Badri Radiyallahu 'anhum.",
    count: "3 Times"
  }
];

// 6. MOULIDS (ശറഫുൽ അനാം, ബർസൻജി, മൻഖൂസ്)
export const MOULID_ITEMS: MoulidItem[] = [
  {
    id: "manqoos",
    name: "Moulid Al-Manqoos (മൻഖൂസ് മൗലിദ്)",
    chapters: [
      {
        title: "Introduction & First Praise",
        arabicText: "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ نُورَ سَيِّدِنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنْ نُورِهِ، وَشَرَّفَ هَذَا الْعَالَمَ بِظُهُورِهِ... اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَيْهِ",
        transliteration: "Alhamdu lillahilladhi khalaqa nura sayyidina Muhammadin sallallahu 'alayhi wa sallama min nurihi, wa sharrafa hadhal-'alama bi-dhuhurihi... Allahumma salli wa sallim 'alayh."
      },
      {
        title: "Yaseen & Shifa Verses inside Manqoos",
        arabicText: "يَا رَبِّ صَلِّ عَلَى الْحَبِيبِ الْأَعْظَمِ، وَشَفِّعْهُ فِينَا يَوْمَ الْفَزَعِ الْأَكْبَرِ. اللَّهُمَّ اكْشِفْ عَنَّا الْكُرَبَ بِحَقِّهِ",
        transliteration: "Ya Rabbi salli 'alal-habibil-a'dham, wa shaffi'hu fina yawmal-faza'il-akbar. Allahumma-kshif 'annal-kuraba bi-haqqih."
      }
    ]
  },
  {
    id: "sharafal_anam",
    name: "Moulid Sharafal Anam (ശറഫുൽ അനാം മൗലിദ്)",
    chapters: [
      {
        title: "Ashraqa Badru Alayna (അശ്‌റഖ ബദ്‌റു അലൈനാ)",
        arabicText: "أَشْرَقَ الْبَدْرُ عَلَيْنَا ۞ فَاخْتَفَتْ مِنْهُ الْبُدُورُ\nمِثْلَ حُسْنِكَ مَا رَأَيْنَا ۞ قَطُّ يَا وَجْهَ السُّرُورِ\nأَنْتَ شَمْسٌ أَنْتَ بَدْرٌ ۞ أَنْتَ نُورٌ فَوْقَ نُورٍ\nأَنْتَ إِكْسِيرٌ وَغَالِي ۞ أَنْتَ مِصْبَاحُ الصُّدُورِ",
        transliteration: "Ashraqal-badru 'alayna, fakhtafat minhul-buduru.\nMithla husnika ma ra'ayna, qattu ya wajhas-sururi.\nAnta shamsun anta badrun, anta nurun fawqa nuri.\nAnta iksirun wa ghali, anta misbahus-suduri."
      },
      {
        title: "Marhaban Supplication",
        arabicText: "يَا حَبِيبِي يَا مُحَمَّد ۞ يَا عَرُوسَ الْخَافِقَيْنِ\nيَا مُؤَيَّدْ يَا مُمَجَّدْ ۞ يَا إِمَامَ الْقِبْلَتَيْنِ\nمَنْ رَأَى وَجْهَكَ يَسْعَدْ ۞ يَا كَرِيمَ الْوَالِدَيْنِ\nحَوْضُكَ الصَّافِي الْمُبَرَّدْ ۞ وِرْدُنَا يَوْمَ النُّشُورِ",
        transliteration: "Ya habibi ya Muhammad, ya 'arusal-khafiqayni.\nYa mu'ayyad ya mumajjad, ya imamal-qiblatayni.\nMan ra'a wajhaka yas'ad, ya karimal-walidayni.\nHawdukas-safi-lmubarrad, wirduna yawman-nushuri."
      }
    ]
  },
  {
    id: "barzanji",
    name: "Moulid Al-Barzanji (ബർസൻജി മൗലിദ്)",
    chapters: [
      {
        title: "Chapter 1 - Origin of the Prophetic Light",
        arabicText: "أَبْتَدِئُ الإِمْلَاءَ بِاسْمِ الذَّاتِ الْعَلِيَّهْ، مُسْتَدِرًّا فَيْضَ الْبَرَكَاتِ عَلَى مَا أَنَالَهُ وَأَوْلاَهْ، وَأُثْنِي بِحَمْدٍ مَوَارِدُهُ سَائِغَةٌ مَلِيَّهْ",
        transliteration: "Abtadi'ul-imla'a bismidh-Dhatil-'Aliyyah, mustadirran faydal-barakati 'ala ma analahu wa awlah. Wa uthni bi-hamdin mawariduhu sa'ighatun maliyyah."
      },
      {
        title: "Chapter 2 - Birth of the Messenger",
        arabicText: "وَلَمَّا تَمَّ مِنْ حَمْلِهِ شَهْرَانِ عَلَى مَشْهُورِ الآرَاءِ الأَثَرِيَّهْ، تُوُفِّيَ بِالْمَدِينَةِ الْمُنَوَّرَةِ أَبُوهُ عَبْدُ اللَّهِ، وَكَانَ قَدِ اجْتَازَ بِأَخْوَالِهِ أَبِي بَكْرٍ الشَّهِيْرِ",
        transliteration: "Wa lamma tamma min hamlihi shahran 'ala mashhuril-ara'il-athariyyah, turuffiya bil-Madinatil-Munawwarati abuhu 'Abdullah..."
      }
    ]
  }
];

// 7. DETAILED STORIES OF THE PROPHETS IN ENGLISH, MANGLISH, & KANNADA
export const PROPHET_STORIES: ProphetStory[] = [
  {
    id: "adam",
    name: "Adam (AS)",
    arabicName: "آدم عليه السلام",
    englishTitle: "Prophet Adam - The First Human and Prophet",
    englishText: `Allah created Prophet Adam (AS) from clay. He was the first human being and the father of mankind. Allah taught Adam the names of all things, showcasing his intellectual capability. When Allah commanded the angels and Iblis (Satan) to bow before Adam in respect, the angels obeyed, but Iblis refused due to arrogance, claiming he was superior because he was made of fire.

Adam and his wife, Hawa (Eve), lived in Paradise with one instruction: not to eat from a specific tree. Iblis deceived them by whispering doubts, promising them eternal life. After they ate from the tree, they realized their mistake and immediately repented to Allah, saying: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.' Allah accepted their repentance and sent them to Earth to start human civilization, promising guidance to those who follow His path.`,
    manglishText: `Allah thaa'ala Aadam nabiyye (AS) mannu kondu srishtichu. Addheham aayirunnu lokathe aadhya manushyanum nabiyum. Allah Aadam nabiyye ella vasthukkallude perukallum padhippichu koduthu. Aadam nabikku sujoodh cheyyan mla'ikathodum iblisinodum Allah kalpichappol, mla'ikath sujoodh cheythu. Ennal iblis kibr karanam athu nishedhichu. Njan theeyinal srishtikkappettavanum addheham manninal srishtikkappettavanum aanennu iblis vaadhichu.

Aadam nabiyum Hawa beeviyum jannathil sushilamai kazhinju. Pakshe avarodu oru prathyeka marathile kani thinnaruthu ennu Allah kalpichittundayirunnu. Iblis avare vaswasilakki, aa kani thinnal ningal ennennum jeevikkum ennu dharipichu. Avar aa kani thinna udane thangalude thettu manassilakki Allah-odu thawba cheythu: 'Rabbe, njangal njangalodu thanne aneedhi cheythu, nee njangalkku poruthu tharilengil njangal nashtakaaril pettu pokum'. Allah avarude thawba sweekarikki, bhumiyilekku ayachu.`,
    kannadaText: `ಅಲ್ಲಾಹನು ಪ್ರವಾದಿ ಆದಮ್ (ಅ) ರವರನ್ನು ಜೇಡಿಮಣ್ಣಿನಿಂದ ಸೃಷ್ಟಿಸಿದನು. ಅವರೇ ಈ ಭೂಮಿಯ ಮೊದಲ ಮಾನವ ಮತ್ತು ಪ್ರವಾದಿ. ಅಲ್ಲಾಹನು ಆದಮ್ ರವರಿಗೆ ಎಲ್ಲಾ ವಸ್ತುಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಸಿಕೊಟ್ಟನು. ಅಲ್ಲಾಹನು ಮಲಾಯಿ ಕರುಗಳಿಗೆ (ದೇವದೂತರಿಗೆ) ಮತ್ತು ಇಬ್ಲಿಸನಿಗೆ ಆದಮರಿಗೆ ಗೌರವ ಸಲ್ಲಿಸಲು ಸಜ್ದಾ ಮಾಡಲು ಆಜ್ಞಾಪಿಸಿದಾಗ, ಮಲಾಯಿ ಕರುಗಳು ಆಜ್ಞೆಯನ್ನು ಪಾಲಿಸಿದರು. ಆದರೆ ಇಬ್ಲಿಸನು ತಾನು ಬೆಂಕಿಯಿಂದ ಸೃಷ್ಟಿಸಲ್ಪಟ್ಟವನು ಮತ್ತು ಆದಮ್ ಮಣ್ಣಿನಿಂದ ಸೃಷ್ಟಿಸಲ್ಪಟ್ಟವನು ಎಂಬ ಅಹಂಕಾರದಿಂದ ಸಜ್ದಾ ಮಾಡಲು ನಿರಾಕರಿಸಿದನು.

ಆದಮ್ ಮತ್ತು ಅವರ ಪತ್ನಿ ಹವ್ವಾ ಜನ್ನತ್ (ಸ್ವರ್ಗ) ದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದರು. ಆದರೆ ಅವರಿಗೆ ಒಂದು ನಿರ್ದಿಷ್ಟ ಮರದ ಹಣ್ಣನ್ನು ತಿನ್ನಬಾರದು ಎಂದು ಅಲ್ಲಾಹನು ಆದೇಶಿಸಿದ್ದನು. ಇಬ್ಲಿಸನು ಅವರನ್ನು ದಾರಿತಪ್ಪಿಸಿ, ಆ ಹಣ್ಣನ್ನು ತಿಂದರೆ ನಿರಂತರವಾಗಿ ಬದುಕಬಹುದು ಎಂದು ನಂಬಿಸಿದನು. ಆ ಹಣ್ಣನ್ನು ತಿಂದ ತಕ್ಷಣ ತಮ್ಮ ತಪ್ಪಿನ ಅರಿವಾಗಿ ಅವರು ಅಲ್ಲಾಹನಲ್ಲಿ ಕ್ಷಮೆಯಾಚಿಸಿದರು. ಅಲ್ಲಾಹನು ಅವರ ಪಶ್ಚಾತ್ತಾಪವನ್ನು ಸ್ವೀಕರಿಸಿ, ಭೂಮಿಗೆ ಕಳುಹಿಸಿಕೊಟ್ಟನು.`
  },
  {
    id: "nuh",
    name: "Nuh (AS)",
    arabicName: "نوح عليه السلام",
    englishTitle: "Prophet Nuh - The Great Ark and Covenant",
    englishText: `Prophet Nuh (Noah) preached the message of pure monotheism to his people for 950 years. He called them to abandon idol worship (Wadd, Suwa', Yaghuth, Ya'uq, and Nasr) and worship Allah alone. Despite his immense patience, only a small group of poor people believed in him. The wealthy elites mocked him and warned people against listening to his message.

Seeing their absolute arrogance and refusal to reform, Allah commanded Nuh to build a massive Ark (Safinah) far away from any water source. The disbelievers laughed at him for building a ship in the desert. Under divine command, Nuh loaded a pair of every animal species and the believers onto the Ark. A great deluge then erupted from the earth and poured from the sky. The entire land was submerged, including Nuh's rebellious son and wife, who refused to board. The Ark floated safely and eventually rested on Mount Judi, marking a fresh, pure start for mankind.`,
    manglishText: `Nuh nabi (AS) thangalude janathayodu 950 varsham dharmo_padhesham nalki. Vignahara aaraadhanakal aayirunna Wadd, Suwa', Yaghuth, Ya'uq, Nasr enniva ozhivakki Ekanaaya Allah-ye mathram aaraadhikkan addheham aavaahanm cheythu. Kure kalam paranjittum valare kurachu pavappetta aallukal mathrame viswasichullu. Kooduthal aallukalum prabhukkanmarum addhehathine parihasichu.

Janangalude kibr thudarnnappol, vellam illatha sthalathുവെച്ചു oru valiya kappal (safinah) nirmikkan Nuh nabiyodu Allah kalpichu. Marubhumiyil kappal undakkunnathu kandu kaafirukal chiriye chiri chirichu. Pakshe kappal nirmannam kazhinjathum, Allah-vude kalpichaprakaram prathi miruga jathiyil ninnum oro jodiye Kappalil ketti. Shabhdhathode vellapokkam undayi, aakashavum bhumiyum onnayi vellathil mungi. Nuh nabiyude nishedhiyaya makanum bharyayum kappalil kayaran koottakkillayirunnu, avar vellathil mungi marichu. Kappal 'Joodhi' parvathathil aduthu.`,
    kannadaText: `ಪ್ರವಾದಿ ನೂಹ್ (ಅ) ರವರು ತಮ್ಮ ಜನರಿಗೆ ಸುಮಾರು ೯೫೦ ವರ್ಷಗಳ ಕಾಲ ಏಕದೇವೋಪಾಸನೆಯ ಸಂದೇಶವನ್ನು ಪ್ರಚಾರ ಮಾಡಿದರು. ಮೂರ್ತಿಪೂಜೆಯನ್ನು ಬಿಟ್ಟು ಕೇವಲ ಅಲ್ಲಾಹನನ್ನೇ ಆರಾಧಿಸುವಂತೆ ಕರೆ ನೀಡಿದರು. ಆದರೆ ಕೇವಲ ಕೆಲವೇ ಕೆಲವು ಬಡ ಜನರು ಮಾತ್ರ ಅವರನ್ನು ನಂಬಿದರು. ಶ್ರೀಮಂತರು ಅವರನ್ನು ಅಪಹಾಸ್ಯ ಮಾಡಿದರು.

ಜನರ ಅಹಂಕಾರ ಹೆಚ್ಚಾದಾಗ, ಅಲ್ಲಾಹನು ನೂಹರಿಗೆ ಒಂದು ದೊಡ್ಡ ಹಡಗನ್ನು (ಸಫೀನತ್) ನಿರ್ಮಿಸಲು ಆಜ್ಞಾಪಿಸಿದನು. ಮರಭೂಮಿಯಲ್ಲಿ ಹಡಗು ಕಟ್ಟುವುದನ್ನು ನೋಡಿ ಜನರು ನಕ್ಕರು. ಹಡಗು ಸಿದ್ಧವಾದಾಗ ಅಲ್ಲಾಹನ ಆಜ್ಞೆಯಂತೆ ಪ್ರತಿಯೊಂದು ಪ್ರಾಣಿಗಳ ಜೋಡಿಯನ್ನು ಮತ್ತು ವಿಶ್ವಾಸಿಗಳನ್ನು ಹಡಗಿನೊಳಗೆ ಕರೆದೊಯ್ಯಲಾಯಿತು. ನಂತರ ಭೀಕರ ಜಲಪ್ರಳಯ ಸಂಭವಿಸಿ ನೂಹರ ವಿರೋಧಿ ಮಗ ಮತ್ತು ಪತ್ನಿ ಸೇರಿದಂತೆ ಎಲ್ಲರೂ ಮುಳುಗಿ ನಾಶವಾದರು. ವಿಶ್ವಾಸಿಗಳಿದ್ದ ಹಡಗು ಸುರಕ್ಷಿತವಾಗಿ ಜೂದಿ ಪರ್ವತದ ಮೇಲೆ ನಿಂತಿತು.`
  },
  {
    id: "ibrahim",
    name: "Ibrahim (AS)",
    arabicName: "إبراهيم عليه السلام",
    englishTitle: "Prophet Ibrahim - The Friend of Allah",
    englishText: `Prophet Ibrahim (Abraham) is known as 'Khalilullah' (the Friend of Allah). Born in Babylonia, he challenged his father Azar and the community who carved and worshiped stone idols. Ibrahim used logic, looking at the stars, moon, and sun, proving that things that set and fade cannot be gods. One day, he broke all the smaller idols in the temple, leaving only the largest one with an axe on its shoulder to make people realize their icons couldn't speak or defend themselves.

Infuriated, King Nimrod and the priests threw Ibrahim into a massive, blazing fire. But Allah commanded the fire: 'O fire, be coolness and safety for Ibrahim.' He walked out completely unharmed. Later, Ibrahim traveled extensively, rebuilt the Holy Kaabah in Makkah with his son Ismail, and successfully passed multiple major tests of faith, establishing the rites of Hajj.`,
    manglishText: `Ibrahim nabi (AS) 'Khaleelullah' (Allah-vude snehithan) enna peril ariyeppedunnu. Babyloniayil janicha addheham, vigrahangal nirmikkunnavanum athine aaraadhikkunnavanumaya achan Azar-nodum kootarodu poruthi. Ibrahim nabi nakshathrangale, chandhrane, suryane nokki chinthichu, maranju pokunna onnum rabaavilla ennu theliyichu. Oru dhivasam addheham palliyile ella vigrahangalum thakarthu, valiya vigrahathil mathram kodaali thukkiyittu janangale chindhippichu.

Ithil kshobhichu Nimrod rajavum koottarum addhehathine valiya thee_kundathilekku erinju. Ennal Allah theeyodu kalpichu: 'Theeyye, nee Ibrahim-nu thaanuppum samrakshanavum aayitheeruka.' Addheham oru pookalathu ninna pole purathekku vannu. Pinneedaddheham makan Ismail nabiyodu oppam Makkah-yil Kaabah punar-nirmichu, Hajj-inte karmangal padhippichu koduthu.`,
    kannadaText: `ಪ್ರವಾದಿ ಇಬ್ರಾಹಿಂ (ಅ) ರವರನ್ನು 'ಖಲೀಲುಲ್ಲಾಹ್' (ಅಲ್ಲಾಹನ ಸ್ನೇಹಿತ) ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಕಲ್ಲಿನ ಮೂರ್ತಿಗಳನ್ನು ಆರಾಧಿಸುತ್ತಿದ್ದ ತನ್ನ ತಂದೆ ಆಜರ್ ಮತ್ತು ಜನರನ್ನು ಅವರು ವಿರೋಧಿಸಿದರು. ಇಬ್ರಾಹಿಂ ರವರು ಒಮ್ಮೆ ದೇವಸ್ಥಾನದ ಸಣ್ಣ ಮೂರ್ತಿಗಳನ್ನೆಲ್ಲಾ ಒಡೆದು, ದೊಡ್ಡ ಮೂರ್ತಿಯ ಹೆಗಲ ಮೇಲೆ ಕೊಡಲಿ ಇಟ್ಟು ಜನರಲ್ಲಿ ಪ್ರಶ್ನೆ ಮೂಡಿಸಿದರು.

ಇದರಿಂದ ಕೋಪಗೊಂಡ ನಮ್ರೂದ್ ರಾಜನು ಇಬ್ರಾಹಿಂ ರವರನ್ನು ದೊಡ್ಡ ಉರಿಯುತ್ತಿರುವ ಬೆಂಕಿಗೆ ಎಸೆದನು. ಆದರೆ ಅಲ್ಲಾಹನು ಬೆಂಕಿಗೆ ಆಜ್ಞಾಪಿಸಿದನು: 'ಓ ಬೆಂಕಿಯೇ, ಇಬ್ರಾಹಿಮರಿಗೆ ತಂಪಾಗಿ ಮತ್ತು ಶಾಂತಿಯಾಗಿರು'. ಅವರು ಯಾವುದೇ ಗಾಯವಿಲ್ಲದೆ ಹೊರಬಂದರು. ನಂತರ ಅವರು ತಮ್ಮ ಮಗ ಇಸ್ಮಾಯಿಲ್ ಜೊತೆಗೂಡಿ ಮಕ್ಕಾದಲ್ಲಿ ಪವಿತ್ರ ಕಅಬಾವನ್ನು ಮರುನಿರ್ಮಾಣ ಮಾಡಿದರು.`
  },
  {
    id: "musa",
    name: "Musa (AS)",
    arabicName: "موسى عليه السلام",
    englishTitle: "Prophet Musa - The Speaker with Allah",
    englishText: `Prophet Musa (Moses) is known as 'Kalimullah' (the one who spoke directly with Allah). Born during the tyranny of Pharaoh (Fir'awn), who slaughtered baby boys, Musa was saved when his mother placed him in a basket floating on the Nile River. He was miraculously adopted by Pharaoh's wife, Asiah, and raised inside the royal palace.

After fleeing to Madyan and returning, Musa was gifted miraculous signs: a staff that turned into a real serpent and a hand that shone brightly. He boldly challenged Pharaoh to release the enslaved Children of Israel. Pharaoh refused and pursued them with a powerful army. Trapped against the Red Sea, Allah ordered Musa to strike the water with his staff. The sea miraculously parted, creating dry pathways. Musa and his people crossed safely, while Pharaoh and his army drowned as the waters collapsed over them.`,
    manglishText: `Musa nabi (AS) 'Kaleemullah' (Allah-vodu nershittu samsarichavan) enna peril ariyeppedunnu. Aan_kuttikale kollunnavanaya Fir'awn-te bhayankaramaaya bharna_kaalathanu Musa nabi janichathu. Umma addhehathine oru pettiyilakki Nile nadiyil ozhukki. Albhuthakaramaai Fir'awn-te bharya Aasiyah addhehathine dthethedukkukayum kottarathil vach valarthukayum cheythu.

Pinneed addhehathinu albhuthangallaya Vadi (ath pampaai maarum) minnunna kai enniva labhichu. Bani Isra'el-e bandhanathil ninnu moochippikkan addheham Fir'awn-odu aavashyappettu. Fir'awn koottaakkiyilennu mathramalla sainyavumai pinthudarnnu. Chenkadalinte munnil valanja samayathu, Allah kalpichathu anusarichu vadi kondu Musa nabi kadalil adichu. Kadal vazhiyundakki pilarnnu. Musa nabiyum kootarum rakshappettu, pinnale vanna Fir'awn-um sainyavum mungi nshichu.`,
    kannadaText: `ಪ್ರವಾದಿ ಮೂಸಾ (ಅ) ರವರನ್ನು 'ಕಲೀಮುಲ್ಲಾಹ್' (ಅಲ್ಲಾಹನೊಂದಿಗೆ ಮಾತನಾಡಿದವರು) ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಗಂಡು ಶಿಶುಗಳನ್ನು ಕೊಲ್ಲುತ್ತಿದ್ದ ಫಿರ್ಔನ್ ಕಾಲದಲ್ಲಿ ಜನಿಸಿದ ಇವರನ್ನು ತಾಯಿ ನೈಲ್ ನದಿಯಲ್ಲಿ ಬುಟ್ಟಿಯಲ್ಲಿ ತೇಲಿಬಿಟ್ಟರು. ಫಿರ್ಔನ್‌ನ ಪತ್ನಿ ಆಸಿಯಾ ರವರು ಇವರನ್ನು ಸಾಕಿ ಬೆಳೆಸಿದರು.

ನಂತರ ಮೂಸಾರಿಗೆ ಕೋಲು ಹಾವಾಗುವ ಮತ್ತು ಕೈ ಪ್ರಕಾಶಿಸುವ ಪವಾಡಗಳನ್ನು ನೀಡಲಾಯಿತು. ಅವರು ಫಿರ್ಔನ್ ಎದುರು ನಿಂತು ಇಸ್ರೇಲ್ ಮಕ್ಕಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಲು ಒತ್ತಾಯಿಸಿದರು. ಫಿರ್ಔನ್ ಸೈನ್ಯದೊಂದಿಗೆ ಬೆನ್ನಟ್ಟಿದಾಗ, ಅಲ್ಲಾಹನ ಆಜ್ಞೆಯಂತೆ ಮೂಸಾರವರು ಕೋಲಿನಿಂದ ಕೆಂಪು ಸಮುದ್ರಕ್ಕೆ ಹೊಡೆದರು. ಸಮುದ್ರವು ಇsplit ಆಗಿ ಒಣ ದಾರಿ ಮಾಡಿಕೊಟ್ಟಿತು. ಮೂಸಾ ಮತ್ತು ಜನರು ದಾಟಿದರು, ಆದರೆ ಫಿರ್ಔನ್ ಸೈನ್ಯದೊಂದಿಗೆ ಮುಳುಗಿ ನಾಶವಾದನು.`
  },
  {
    id: "isa",
    name: "Isa (AS)",
    arabicName: "عيسى عليه السلام",
    englishTitle: "Prophet Isa - The Messiah and Word of Allah",
    englishText: `Prophet Isa (Jesus) was born miraculously without a father to the pious Virgin Maryam (Mary). In response to slander from her community, Allah made Isa speak as an infant in the cradle, declaring his prophethood and defense of his mother.

Isa was blessed with incredible miracles by Allah's leave: healing the blind, curing lepers, molding birds from clay and breathing life into them, and raising the dead. He preached the Injeel (Gospel), calling the Children of Israel back to the true spirit of the Torah. When the elite conspirators plotted to crucify him, Allah protected him by raising him bodily to Heaven, and he will return before the Day of Judgment to restore justice and peace.`,
    manglishText: `Isa nabi (AS) abhudhakaramaai, thantheyillathe Parishudha Maryam beevikk janichu. Janangal Maryam beeviye apamaanichappol, thottilil kidanna kunjayirunna Isa nabi samsarichu, thaan Allah-vinte dhoothanum nabiyum aanennu prabhodhichu.

Allah-vude anuvadhadhode kurchere albhuthangal addhehathinnu undayirunnu: kazhchayillathavarkku kazhcha nalkal, kushta-rogiye sukhappeduthal, mannukondu pakshiye undakki jeevan nalkal, marichavare jeevippikkal. Addheham Injeel prabhodhichu. Shathrukkal addhehathine kurishil tharakkan sremichappol, Allah addhehathine parishudhamaai aakaashathekku uyarthi. Qiyamath nallinu munpu addheham thirichu varum.`,
    kannadaText: `ಪ್ರವಾದಿ ಈಸಾ (ಅ) ರವರು ತಂದೆಯಿಲ್ಲದೆ ಪವಿತ್ರ ಮರಿಯಮ್ ದೇವಿಗೆ ಪವಾಡಸದೃಶವಾಗಿ ಜನಿಸಿದರು. ಜನರು ಮರಿಯಮರನ್ನು ದೂಷಿಸಿದಾಗ ತೊಟ್ಟಿಲಲ್ಲಿದ್ದ ಮಗು ಈಸಾ ಮಾತನಾಡಿ ತಾನು ಅಲ್ಲಾಹನ ಪ್ರವಾದಿ ಎಂದು ಸಾರಿದರು.

ಅಲ್ಲಾಹನ ಅನುಮತಿಯೊಂದಿಗೆ ಅವರು ಕುರುಡರಿಗೆ ಕಣ್ಣು ನೀಡುವುದು, ಕುಷ್ಠರೋಗಿಗಳನ್ನು ವಾಸಿ ಮಾಡುವುದು, ಜೇಡಿಮಣ್ಣಿನಿಂದ ಹಕ್ಕಿಗಳನ್ನು ಮಾಡಿ ಜೀವ ತುಂಬುವುದು ಮತ್ತು ಸತ್ತವರನ್ನು ಬದುಕಿಸುವ ಪವಾಡಗಳನ್ನು ತೋರಿದರು. ವೈರಿಗಳು ಅವರನ್ನು ಕೊಲ್ಲಲು ಸಂಚು ಹೂಡಿದಾಗ ಅಲ್ಲಾಹನು ಅವರನ್ನು ಆಕಾಶಕ್ಕೆ ಎತ್ತಿಕೊಂಡನು. ಯುಗಾಂತ್ಯದ ಮೊದಲು ಅವರು ಮತ್ತೆ ಮರಳಿ ಬರಲಿದ್ದಾರೆ.`
  },
  {
    id: "muhammad",
    name: "Muhammad (SAW)",
    arabicName: "محمد صلى الله عليه وسلم",
    englishTitle: "Prophet Muhammad - The Seal of all Prophets",
    englishText: `Prophet Muhammad (SAW) was born in Makkah in 570 CE. Known as 'Al-Amin' (the Trustworthy) and 'Al-Sadiq' (the Truthful), he received the first revelation of the Holy Quran through Angel Jibreel at age 40 in the Cave of Hira. He spent 23 years conveying the message of Islam, establishing the five pillars, and refining human character.

Faced with severe persecution from Quraish, he migrated (Hijrah) to Madinah, where he established a highly just, multi-religious society. Overcoming several critical battles, he returned to Makkah in a bloodless conquest, forgiving his worst enemies. He completed the mission, leaving behind the Quran and the Sunnah, and is recognized as a mercy to all creations ('Rahmatul lil-'Alamin').`,
    manglishText: `Nabiyullah Muhammad (SAW) AD 570-il parishudha Makkah-yil janichu. 'Al-Ameen' (viswasthan) enna peril ariyeppedunnu. 40-aam vayasil Hira guhayil dhyanithil irikkave Jibreel (AS) vazhi aadhya vahyu (Quran) labhichu. 23 varsham kondu addheham lokarkku deen padhippichu nalki.

Quraish-ukallude drohangal karanam Madinah-yilekku Hijrah poyi. Avide oru nalla baranam undaki. Pala yudhangalum vijayichu Makkah fatah cheythu, thante shathrukkallodu ellam addheham kshamichu. Qiyamath nallu vareyulla manushyarkku nerkkaattiyayi Quran-um thante jeevithavum (Sunnath) nalkiyanu nabi thangal pathrathil ninnu vida paranjathu. Addheham 'Rahmatul lil-Alameen' (lokarkkellam kaarunyam) aanu.`,
    kannadaText: `ಪ್ರವಾದಿ ಮುಹಮ್ಮದ್ (ಸ) ರವರು ಕ್ರಿ.ಶ ೫೭೦ ರಲ್ಲಿ ಮಕ್ಕಾದಲ್ಲಿ ಜನಿಸಿದರು. ಅವರು ಅತ್ಯಂತ ನಂಬಿಕಸ್ಥ ಮತ್ತು ಪ್ರಾಮಾಣಿಕರಾಗಿದ್ದರು. ತಮ್ಮ ೪೦ ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಹಿರಾಗುಹೆಯಲ್ಲಿ ಜಿಬ್ರೀಲ್ ದೇವದೂತರ ಮೂಲಕ ಮೊದಲ ಖುರಾನ್ ಪ್ರಕಟಣೆಯನ್ನು ಪಡೆದರು. ಅವರು ಸುಮಾರು ೨೩ ವರ್ಷಗಳ ಕಾಲ ಇಸ್ಲಾಂ ಧರ್ಮವನ್ನು ಪ್ರಚಾರ ಮಾಡಿದರು.

ವೈರಿಗಳ ಕಾಟ ಹೆಚ್ಚಾದಾಗ ಅವರು ಮದೀನಾಕ್ಕೆ ವಲಸೆ (ಹಿಜ್ರತ್) ಹೋದರು. ನಂತರ ಮಕ್ಕಾವನ್ನು ವಿಜಯ ಸಾಧಿಸಿ ತಮ್ಮ ವೈರಿಗಳನ್ನು ಕ್ಷಮಿಸಿದರು. ಅವರು ಜಗತ್ತಿಗೆ ಕಾರುಣ್ಯದ ರೂಪವಾಗಿದ್ದರು ಮತ್ತು ಅವರ ಕೊನೆಯ ಸಂದೇಶದೊಂದಿಗೆ ಪ್ರವಾದಿ ಸರಣಿ ಮುಕ್ತಾಯಗೊಂಡಿತು.`
  }
];
