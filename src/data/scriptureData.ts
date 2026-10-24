export interface StudyModule {
  id: string;
  title: string;
  subtitle: string;
  cardSnippet: string;
  image: string;
  category: 'Discernment' | 'Scripture' | 'Bible Studies';
  keyVerseRef: string;
  keyVerseKJV: string;
  greekOrHebrewTerm: {
    transliteration: string;
    original: string;
    meaning: string;
  };
  historicalContext: string;
  exegesisPoints: string[];
  discernmentQuestions: string[];
  pastoralNote: string;
}

export interface ScriptureEvidence {
  id: string;
  reference: string;
  shortLabel: string;
  subLabel?: string;
  bookContext: string;
  kjvText: string;
  theme: string;
  greekKey: string;
  commentary: string;
  crossReferences: string[];
  keywords: string[];
}

export interface FeaturePillar {
  id: string;
  title: string;
  description: string;
  scriptureAnchor: string;
  scriptureQuote: string;
  principles: {
    heading: string;
    detail: string;
  }[];
}

export const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'test-teaching',
    title: 'TEST THE TEACHING',
    description:
      'Examine every sermon, prophetic claim, and doctrinal statement with spiritual sobriety and fidelity to the written Word.',
    scriptureAnchor: '1 John 4:1',
    scriptureQuote:
      'Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world.',
    principles: [
      {
        heading: 'Christological Confession',
        detail:
          'Does the teaching exalt the biblical Lord Jesus Christ—His incarnation, atoning blood, bodily resurrection, and lordship—or does it subtly shift focus toward human exaltation?'
      },
      {
        heading: 'Apostolic Alignment',
        detail:
          'Does the message agree with the whole counsel of apostolic Scripture (Acts 20:27), or does it rely on isolated proof-texts divorced from context?'
      },
      {
        heading: 'Spiritual Fruit & Humility',
        detail:
          'Does the teaching produce reverence, repentance, holiness, and love for truth, rather than spiritual pride, sensationalism, or merchandise of souls?'
      }
    ]
  },
  {
    id: 'search-scriptures',
    title: 'SEARCH THE SCRIPTURES',
    description:
      'Examine biblical context and compare spiritual things with spiritual, following the noble Berean standard of daily inquiry.',
    scriptureAnchor: 'Acts 17:11',
    scriptureQuote:
      'These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.',
    principles: [
      {
        heading: 'Readiness of Mind with Diligent Verification',
        detail:
          'True Berean nobility combines an eager, teachable heart with rigorous daily verification against the inspired text.'
      },
      {
        heading: 'Scripture Interprets Scripture',
        detail:
          'Unclear or disputed passages must always be illuminated by clear, foundational passages across both Old and New Testaments.'
      },
      {
        heading: 'Authorial & Covenantal Context',
        detail:
          'Honoring who wrote the passage, to whom it was addressed, and how it fits within redemptive history prevents private misinterpretation.'
      }
    ]
  },
  {
    id: 'hold-fast',
    title: 'HOLD FAST TO TRUTH',
    description:
      'Stand unshaken in sound biblical doctrine, proving all things by the Word and clinging faithfully to that which is good.',
    scriptureAnchor: '1 Thessalonians 5:21',
    scriptureQuote: 'Prove all things; hold fast that which is good.',
    principles: [
      {
        heading: 'Guarding the Sacred Deposit',
        detail:
          'Once truth has been tested and proven by the Word of God, believers are commanded to embrace and defend it without compromise (2 Timothy 1:13–14).'
      },
      {
        heading: 'Rejecting Every Form of Deception',
        detail:
          'Discernment is not mere skepticism; it clears away error so the church may cling wholeheartedly to pure, life-giving doctrine.'
      },
      {
        heading: 'Equipped for Every Good Work',
        detail:
          'Scripture-grounded discernment matures the body of Christ so we are no longer tossed to and fro by every wind of doctrine (Ephesians 4:14).'
      }
    ]
  }
];

export const STUDY_ARCHIVE: StudyModule[] = [
  {
    id: 'testing-the-spirits',
    title: 'Testing the Spirits',
    subtitle: 'Examine the doctrinal foundation and spiritual source of every claim.',
    cardSnippet: 'Examine the scriptural mandate for testing the spirits in 1 John 4.',
    image: '/assets/aistudio/cropped_circle_image__1__4c2928a7.png',
    category: 'Discernment',
    keyVerseRef: '1 John 4:1–3',
    keyVerseKJV:
      'Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world. Hereby know ye the Spirit of God: Every spirit that confesseth that Jesus Christ is come in the flesh is of God.',
    greekOrHebrewTerm: {
      transliteration: 'Dokimazō (δοκιμάζω)',
      original: 'δοκιμάζω',
      meaning:
        'To test metals by fire for purity; to assay, examine, scrutinize, and prove whether a thing is genuine or counterfeit.'
    },
    historicalContext:
      'Writing from Ephesus toward the close of the first century, the Apostle John confronted early Gnostic and Docetic teachers who claimed special spiritual illumination while denying the true incarnation and apostolic doctrine of Jesus Christ.',
    exegesisPoints: [
      'The command "try the spirits" (dokimazete ta pneumata) is an imperative addressed to all believers, not merely church leaders.',
      'Credulity is not a Christian virtue; love for God requires love for His truth and vigilance against spiritual counterfeit.',
      'The primary test of any spiritual manifestation is its fidelity to the incarnate Christ and the apostolic witness ("he that knoweth God heareth us", 1 John 4:6).'
    ],
    discernmentQuestions: [
      'Does this teaching honor the person, finished work, and sufficiency of Jesus Christ as revealed in Scripture?',
      'Does the messenger submit to apostolic authority—the written New and Old Testament Scriptures—or claim a higher private revelation?',
      'Does the spirit behind the message lead people toward reverence, holiness, and obedience to God’s Word?'
    ],
    pastoralNote:
      'When we test the spirits by the Word of God, we do so not out of cynicism, but out of deep devotion to the Good Shepherd whose voice is never contrary to the Scriptures He inspired. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  },
  {
    id: 'false-prophets-teaching',
    title: 'False Prophets & False Teaching',
    subtitle: 'Identify deceptive doctrines and counterfeit voices through Scripture.',
    cardSnippet: 'Examine the biblical warnings regarding false prophets and deceptive teaching.',
    image: '/assets/aistudio/cropped_circle_image__4__21809b77.png',
    category: 'Discernment',
    keyVerseRef: 'Matthew 7:15–16 & 2 Peter 2:1',
    keyVerseKJV:
      'Beware of false prophets, which come to you in sheep’s clothing, but inwardly they are ravening wolves. Ye shall know them by their fruits... But there were false prophets also among the people, even as there shall be false teachers among you, who privily shall bring in damnable heresies.',
    greekOrHebrewTerm: {
      transliteration: 'Pseudoprophētēs (ψευδοπροφήτης)',
      original: 'ψευδοπροφήτης',
      meaning:
        'A spurious prophet; one who speaks under the pretense of divine inspiration while proclaiming the delusions of their own heart.'
    },
    historicalContext:
      'From Deuteronomy 13 and Jeremiah 23 to Christ’s Sermon on the Mount and Peter’s second epistle, Scripture consistently warns that spiritual deception arises from within the visible community wearing the outward garments of piety.',
    exegesisPoints: [
      'Deception rarely announces itself openly; it arrives "in sheep’s clothing" using biblical vocabulary redefined with unbiblical meanings.',
      'In Jeremiah 23:16–22, false prophets speak peace to those who walk in stubbornness rather than calling them to repentance in God’s counsel.',
      'In Deuteronomy 13:1–4, even signs and wonders must be rejected if they entice believers away from the commandments and truth of the Lord.'
    ],
    discernmentQuestions: [
      'Does the teacher preach the cross, repentance, and self-denial, or do they flatter worldly desires and covetousness (2 Peter 2:3)?',
      'Are verses quoted in their true grammatical and historical setting, or twisted to validate personal agendas?',
      'What is the long-term character, accountability, and fruit in the lives of the teacher and their followers?'
    ],
    pastoralNote:
      'A wolf in sheep’s clothing is detected not by the fleece he wears, but by the diet he feeds the flock and the direction he leads them. Only the lamp of Scripture exposes the difference. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  },
  {
    id: 'holy-spirit-in-scripture',
    title: 'The Holy Spirit in Scripture',
    subtitle: 'Understand the true ministry, witness, and sanctifying work of the Spirit.',
    cardSnippet: 'Examine the biblical work of the Spirit of Truth across the Scriptures.',
    image: '/assets/aistudio/cropped_circle_image__3__863518da.png',
    category: 'Scripture',
    keyVerseRef: 'John 16:13–14',
    keyVerseKJV:
      'Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come. He shall glorify me: for he shall receive of mine, and shall shew it unto you.',
    greekOrHebrewTerm: {
      transliteration: 'Pneuma tēs Alētheias (Πνεῦμα τῆς ἀληθείας)',
      original: 'Πνεῦμα τῆς ἀληθείας',
      meaning:
        'The Spirit of Truth—the Divine Comforter (Paraklētos) who communicates, illuminates, and bears witness to the objective truth of Christ.'
    },
    historicalContext:
      'In the Upper Room Discourse (John 14–16), Jesus prepared His disciples for His departure by promising the Holy Spirit—not as an chaotic or self-exalting force, but as the Spirit of Truth who brings Christ’s words to remembrance and glorifies the Son.',
    exegesisPoints: [
      'The Holy Spirit is explicitly titled "the Spirit of truth" (John 14:17, 15:26, 16:13); He never authors confusion, disorder, or doctrinal error (1 Corinthians 14:33).',
      'The hallmark of the Spirit’s fullness is the glorification of Jesus Christ ("He shall glorify me") and the fruit of holiness (Galatians 5:22–23).',
      'Because the Holy Spirit inspired the Scriptures (2 Peter 1:21), the Spirit in the believer will never contradict the Spirit in the Book.'
    ],
    discernmentQuestions: [
      'Does a claimed movement of the Spirit draw hearts to the centrality of Christ and reverence for His Word?',
      'Is self-control (temperance)—a primary fruit of the Spirit in Galatians 5:23—evident in the gathering?',
      'Does the teaching distinguish between emotional excitement and genuine regeneration and sanctification by the Spirit?'
    ],
    pastoralNote:
      'The Spirit and the Word are inseparable in Christian experience. Where the Holy Spirit truly moves, Jesus Christ is magnified and the Scriptures are loved, obeyed, and proclaimed. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  },
  {
    id: 'prophecy-and-discernment',
    title: 'Prophecy & Discernment',
    subtitle: 'Weigh prophetic claims with scriptural wisdom, order, and reverence.',
    cardSnippet: 'Examine the biblical context and apostolic rules for testing prophecy.',
    image: '/assets/aistudio/cropped_circle_image__5__dbeb9244.png',
    category: 'Discernment',
    keyVerseRef: '1 Corinthians 14:29 & 1 Thessalonians 5:20–21',
    keyVerseKJV:
      'Let the prophets speak two or three, and let the other judge... Despise not prophesyings. Prove all things; hold fast that which is good.',
    greekOrHebrewTerm: {
      transliteration: 'Diakrinō (διακρίνω)',
      original: 'διακρίνω',
      meaning:
        'To separate thoroughly, sift, weigh, and judge carefully so as to distinguish between what is authentic and what is human presumption.'
    },
    historicalContext:
      'In the Corinthian and Thessalonian churches, Paul established clear apostolic safeguards: congregations must neither cynically despise the work of God nor gullibly accept unexamined utterances. Every word must be weighed by the congregation against Scripture.',
    exegesisPoints: [
      'Biblical edification, exhortation, and comfort (1 Corinthians 14:3) always align with revealed Scripture and never usurp the finality of the biblical canon (Hebrews 1:1–2).',
      '"Let the other judge" (diakrinetōsan) establishes communal, Scripture-bound accountability rather than unchecked personal authority.',
      'No private word may ever manipulate believers, override moral commands, or claim infallibility equal to canonical Scripture.'
    ],
    discernmentQuestions: [
      'Is the utterance willingly submitted to the judgment of mature elders and the written Word of God?',
      'Does it edify the church in Christ, or does it foster dependency on a human figure for personal direction?',
      'Does it conform to the apostolic rule that all things be done unto edifying, decently, and in order (1 Corinthians 14:26, 40)?'
    ],
    pastoralNote:
      'Biblical discernment protects the church from both extremes: cold formalism on one hand and unscriptural fanaticism on the other. We test every word by the infallible standard of Scripture. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  },
  {
    id: 'biblical-context',
    title: 'Biblical Context',
    subtitle: 'Read every passage within its historical, grammatical, and covenantal frame.',
    cardSnippet: 'Examine the surrounding context and authorial intent of every passage.',
    image: '/assets/aistudio/cropped_circle_image__2__27130018.png',
    category: 'Bible Studies',
    keyVerseRef: '2 Timothy 2:15 & Nehemiah 8:8',
    keyVerseKJV:
      'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth... So they read in the book in the law of God distinctly, and gave the sense, and caused them to understand the reading.',
    greekOrHebrewTerm: {
      transliteration: 'Orthotomeō (ὀρθοτομέω)',
      original: 'ὀρθοτομέω',
      meaning:
        'To cut straight; to plow a straight furrow or lay out a road with precision—handling the Word of Truth accurately without distortion.'
    },
    historicalContext:
      'Paul charged Timothy in Ephesus to contrast the "profane and vain babblings" of false teachers by being an unashamed workman who cuts a straight line through Scripture, respecting the structure and intent of God’s revelation.',
    exegesisPoints: [
      'Exegesis (drawing out the text’s actual meaning) must always govern our reading, rather than eisegesis (reading our own preconceptions into the text).',
      'Every verse belongs to a paragraph, an argument, a book, and a covenantal moment in redemptive history.',
      'Comparing parallel passages and honoring the distinction between descriptive historical narrative and prescriptive doctrinal teaching guards against error.'
    ],
    discernmentQuestions: [
      'What do the twenty verses before and twenty verses after this citation actually teach?',
      'Who is speaking, to whom are they speaking, and what was the original problem being addressed?',
      'Does the interpretation harmonize with the rest of the Bible’s teaching on this subject?'
    ],
    pastoralNote:
      'A text taken out of its context becomes a pretext for human invention. When we read Scripture carefully in its full context, the voice of God shines with unmistakable clarity. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  },
  {
    id: 'christian-apologetics',
    title: 'Christian Apologetics',
    subtitle: 'Contend earnestly for the faith and give a reasoned defense with humility.',
    cardSnippet: 'Equipping believers for biblical defense and Christian apologetics.',
    image: '/assets/aistudio/cropped_circle_image__1__4c2928a7.png',
    category: 'Bible Studies',
    keyVerseRef: '1 Peter 3:15 & Jude 1:3',
    keyVerseKJV:
      'But sanctify the Lord God in your hearts: and be ready always to give an answer to every man that asketh you a reason of the hope that is in you with meekness and fear... earnestly contend for the faith which was once delivered unto the saints.',
    greekOrHebrewTerm: {
      transliteration: 'Apologia (ἀπολογία)',
      original: 'ἀπολογία',
      meaning:
        'A reasoned verbal defense; a clear, well-grounded explanation of the truth delivered before an inquiry or tribunal.'
    },
    historicalContext:
      'Both Peter and Jude wrote to scattered believers facing cultural hostility without and subtle doctrinal corruption within, calling them to combine unyielding fidelity to "the faith once delivered" with deep Christlike meekness and reverence.',
    exegesisPoints: [
      '"The faith" in Jude 1:3 refers to the objective body of apostolic doctrine entrusted once for all to the Church—not something to be reinvented in every generation.',
      'True biblical apologetics begins in the heart: "Sanctify the Lord God in your hearts" (1 Peter 3:15)—reverence for Christ precedes public defense.',
      'Truth must always be defended with "meekness and fear" (gentleness and reverence), seeking to win souls to the truth rather than merely winning arguments.'
    ],
    discernmentQuestions: [
      'Am I able to explain the gospel of grace and core biblical doctrines directly from the pages of Scripture?',
      'Is my defense of the truth marked by humility, patience, and prayerful love (2 Timothy 2:24–25)?',
      'Do I distinguish clearly between primary essentials of the Christian faith and secondary matters of conscience?'
    ],
    pastoralNote:
      'We contend for the faith without being contentious in spirit. Grounded in Scripture and guided by truth, we hold forth the Word of life with conviction and grace. — Pastor Shahid Hanif & Pastor Sandesh Shalom'
  }
];

export const SCRIPTURE_EVIDENCE_LIST: ScriptureEvidence[] = [
  {
    id: '1-john-4-1',
    reference: '1 John 4:1',
    shortLabel: '1 John 4:1',
    bookContext: 'First Epistle of John · Chapter 4',
    kjvText:
      'Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world.',
    theme: 'The Mandate to Test Every Spiritual Claim',
    greekKey: 'Dokimazō (δοκιμάζω) — To test, examine, scrutinize for genuineness',
    commentary:
      'The Apostle John commands believers not to be spiritually gullible. Because counterfeit spirits and false prophets operate using religious language, every spiritual claim and teaching must be tested against the apostolic confession of Jesus Christ come in the flesh and the written Word of God.',
    crossReferences: ['1 John 4:2–6', 'Matthew 7:15–20', 'Deuteronomy 13:1–4'],
    keywords: ['1 john 4:1', 'spirit', 'spirits', 'try', 'test', 'false prophets', 'john']
  },
  {
    id: '1-thess-5-16-21',
    reference: '1 Thessalonians 5:16–21',
    shortLabel: '1 Thess 5:16–21',
    subLabel: 'Prove all things',
    bookContext: 'First Epistle to the Thessalonians · Chapter 5',
    kjvText:
      'Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you. Quench not the Spirit. Despise not prophesyings. Prove all things; hold fast that which is good.',
    theme: 'Balanced Discernment: Prove All Things, Hold Fast the Good',
    greekKey: ' Katechō (κατέχω) — To hold fast, retain firmly, keep secure in possession',
    commentary:
      'Paul sets forth the golden balance of Christian discernment: we neither quench the genuine work of the Holy Spirit nor accept claims uncritically. Instead, we test ("prove") all things by the canon of Scripture and hold fast to whatever passes the test of divine truth.',
    crossReferences: ['1 Corinthians 14:29', 'Ephesians 5:10', 'Philippians 1:9–10'],
    keywords: ['1 thessalonians 5:21', '5:16', '5:21', 'prove all things', 'hold fast', 'prophesyings', 'thessalonians']
  },
  {
    id: 'acts-17-11',
    reference: 'Acts 17:11',
    shortLabel: 'Acts 17:11',
    bookContext: 'Acts of the Apostles · Chapter 17',
    kjvText:
      'These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.',
    theme: 'The Berean Standard of Daily Scriptural Verification',
    greekKey: 'Anakrinō (ἀνακρίνω) — To examine carefully, investigate, sift through evidence',
    commentary:
      'Even when hearing the Apostle Paul himself, the believers in Berea were commended by the Holy Spirit as "more noble" (eugenesteroi) because they combined eager receptivity with daily, diligent examination of the Scriptures to verify every doctrine.',
    crossReferences: ['Isaiah 8:20', 'Psalm 119:105', 'Luke 24:27'],
    keywords: ['acts 17:11', 'berean', 'bereans', 'searched the scriptures', 'noble', 'daily', 'acts']
  },
  {
    id: '2-timothy-3-16-17',
    reference: '2 Timothy 3:16–17',
    shortLabel: '2 Timothy 3:16–17',
    subLabel: '(KJV Typography)',
    bookContext: 'Second Epistle to Timothy · Chapter 3',
    kjvText:
      'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works.',
    theme: 'The Divine Inspiration & Complete Sufficiency of Scripture',
    greekKey: 'Theopneustos (θεόπνευστος) — God-breathed; expired directly by the breath of God',
    commentary:
      'Because all Scripture is breathed out by God Himself, it carries supreme authority and complete sufficiency. It teaches true doctrine, exposes error ("reproof"), restores the wandering ("correction"), and trains the believer in righteousness.',
    crossReferences: ['2 Peter 1:19–21', 'Psalm 19:7–11', 'Hebrews 4:12'],
    keywords: ['2 timothy 3:16', '3:16-17', 'inspiration', 'scripture', 'doctrine', 'reproof', 'correction', 'timothy', 'kjv']
  },
  {
    id: 'galatians-1-8-9',
    reference: 'Galatians 1:8–9',
    shortLabel: 'Galatians 1:8–9',
    bookContext: 'Epistle to the Galatians · Chapter 1',
    kjvText:
      'But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed.',
    theme: 'The Unchanging Apostolic Gospel Over All Messengers',
    greekKey: 'Euangelizō (εὐαγγελίζω) — To proclaim the glad tidings of salvation through Christ alone',
    commentary:
      'In biblical Christianity, the message judges the messenger—never the reverse. Not even an apostle or a glorious angelic visitation has authority to alter, add to, or subtract from the gospel of grace once delivered.',
    crossReferences: ['2 Corinthians 11:3–4', '2 Corinthians 11:13–15', 'Jude 1:3'],
    keywords: ['galatians 1:8', 'angel', 'another gospel', 'gospel', 'accursed']
  },
  {
    id: 'isaiah-8-20',
    reference: 'Isaiah 8:20',
    shortLabel: 'Isaiah 8:20',
    bookContext: 'Book of the Prophet Isaiah · Chapter 8',
    kjvText:
      'To the law and to the testimony: if they speak not according to this word, it is because there is no light in them.',
    theme: 'The Covenant Touchstone of True Light',
    greekKey: 'Tōrāh & Te‘ūdāh (תּוֹרָה וְלִתְעוּדָה) — The Divine Instruction and Written Testimony',
    commentary:
      'When surrounded by spiritualists and competing voices claiming secret insight, Isaiah directs God’s people back to the written Word ("To the law and to the testimony"). Any voice that contradicts God’s written revelation lacks the dawn of divine light.',
    crossReferences: ['Psalm 119:130', '2 Peter 1:19', 'Jeremiah 23:28–29'],
    keywords: ['isaiah 8:20', 'law', 'testimony', 'no light', 'isaiah']
  }
];

export const FEATURED_SCRIPTURES_CARDS = [
  {
    id: '1-john-4-1',
    title: '1 John 4:1',
    subtitle: null,
    verse:
      '“Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world.”',
    theme: 'Testing Spiritual Claims'
  },
  {
    id: 'acts-17-11',
    title: 'Acts 17:11',
    subtitle: null,
    verse:
      '“These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.”',
    theme: 'Noble Daily Verification'
  },
  {
    id: '1-thess-5-16-21',
    title: '1 Thessalonians 5:21',
    subtitle: null,
    verse: '“Prove all things; hold fast that which is good.”',
    theme: 'Discernment & Fidelity'
  },
  {
    id: '2-timothy-3-16-17',
    title: '2 Timothy 3:16–17',
    subtitle: '(KJV typography)',
    verse:
      '“All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works.”',
    theme: 'Sufficiency of Scripture'
  }
];
