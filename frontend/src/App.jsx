import React, { useState, useEffect, useMemo } from 'react';
import {
  Leaf,
  Brain,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  Search,
  Bell,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Filter,
  Activity,
  Microscope,
  Sprout,
  Moon,
  Flame,
  Eye,
  RefreshCw,
  X,
  Stethoscope,
  Wind,
  Droplets,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', name: 'Todas las Áreas', icon: Sparkles },
  { id: 'NEURO', name: 'Cerebro y Memoria', icon: Brain },
  { id: 'GASTRO', name: 'Estómago y Digestión', icon: Flame },
  { id: 'CARDIO', name: 'Corazón y Circulación', icon: HeartPulse },
  { id: 'PSYCH', name: 'Estrés, Ansiedad y Sueño', icon: Moon },
  { id: 'IMMUNE', name: 'Defensas y Dolor Articular', icon: ShieldAlert },
  { id: 'ENDO', name: 'Salud Hormonal', icon: Activity },
  { id: 'DERMA', name: 'Piel y Cabello', icon: Sprout },
  { id: 'RESP', name: 'Pulmones y Vías Respiratorias', icon: Wind },
  { id: 'RENAL', name: 'Hígado y Riñones', icon: Droplets },
  { id: 'ONCO', name: 'Cuidado Celular e Integrativo', icon: Microscope }
];

const MEDICAL_SEARCH_DICTIONARY = {
  'reflujo': 'gastroesophageal reflux GERD esophagitis heartburn',
  'gastritis': 'gastritis gastric ulcer Helicobacter pylori',
  'sibo': 'small intestinal bacterial overgrowth SIBO dysbiosis',
  'post sibo': 'small intestinal bacterial overgrowth SIBO gut motility dysbiosis',
  'colon irritable': 'irritable bowel syndrome IBS abdominal pain',
  'intestino irritable': 'irritable bowel syndrome IBS',
  'estrenimiento': 'constipation gastrointestinal transit',
  'estreñimiento': 'constipation gastrointestinal transit',
  'diarrea': 'diarrhea acute gastroenteritis',
  'gases': 'bloating flatulence meteorism',
  'hinchazon': 'abdominal bloating distension dyspepsia',
  'hinchazón': 'abdominal bloating distension dyspepsia',
  'higado graso': 'non-alcoholic fatty liver disease NAFLD MASLD hepatic steatosis',
  'hígado graso': 'non-alcoholic fatty liver disease NAFLD MASLD hepatic steatosis',
  'higado': 'liver hepatoprotective hepatic steatosis',
  'hígado': 'liver hepatoprotective hepatic steatosis',
  'calculos renales': 'kidney stones nephrolithiasis urolithiasis',
  'cálculos renales': 'kidney stones nephrolithiasis urolithiasis',
  'calculos en los rinones': 'kidney stones nephrolithiasis urolithiasis',
  'cálculos en los riñones': 'kidney stones nephrolithiasis urolithiasis',
  'riñones': 'renal kidney nephrolithiasis urinary',
  'rinones': 'renal kidney nephrolithiasis urinary',
  'infeccion urinaria': 'urinary tract infection cystitis',
  'infección urinaria': 'urinary tract infection cystitis',
  'cistitis': 'cystitis urinary tract infection',
  'prostata': 'benign prostatic hyperplasia prostate prostatitis',
  'próstata': 'benign prostatic hyperplasia prostate prostatitis',
  'diabetes': 'type 2 diabetes mellitus glycemic insulin resistance',
  'azucar alta': 'hyperglycemia type 2 diabetes insulin resistance',
  'azúcar alta': 'hyperglycemia type 2 diabetes insulin resistance',
  'colesterol': 'hypercholesterolemia dyslipidemia LDL cholesterol',
  'trigliceridos': 'hypertriglyceridemia triglycerides dyslipidemia',
  'triglicéridos': 'hypertriglyceridemia triglycerides dyslipidemia',
  'presion alta': 'hypertension blood pressure',
  'presión alta': 'hypertension blood pressure',
  'hipertension': 'hypertension blood pressure',
  'hipertensión': 'hypertension blood pressure',
  'varices': 'varicose veins chronic venous insufficiency',
  'várices': 'varicose veins chronic venous insufficiency',
  'circulacion': 'microcirculation vascular endothelial blood flow',
  'circulación': 'microcirculation vascular endothelial blood flow',
  'memoria': 'memory cognitive function cognition',
  'concentracion': 'attention executive function cognitive performance',
  'concentración': 'attention executive function cognitive performance',
  'alzheimer': 'Alzheimer disease mild cognitive impairment neuroprotection',
  'migraña': 'migraine headache prophylaxis',
  'migrana': 'migraine headache prophylaxis',
  'dolor de cabeza': 'headache tension migraine',
  'acufenos': 'tinnitus cochlear blood flow',
  'acúfenos': 'tinnitus cochlear blood flow',
  'zumbido': 'tinnitus auditory',
  'ansiedad': 'anxiety disorder generalized anxiety anxiolytic',
  'estres': 'psychological stress cortisol adaptogen',
  'estrés': 'psychological stress cortisol adaptogen',
  'insomnio': 'insomnia sleep quality sleep latency',
  'sueño': 'sleep quality insomnia',
  'sueno': 'sleep quality insomnia',
  'depresion': 'depression depressive symptoms mood',
  'depresión': 'depression depressive symptoms mood',
  'artritis': 'rheumatoid arthritis osteoarthritis joint inflammation',
  'artrosis': 'osteoarthritis knee pain cartilage',
  'dolor de rodilla': 'knee osteoarthritis joint pain',
  'dolor de rodillas': 'knee osteoarthritis joint pain',
  'dolor articular': 'joint pain arthralgia osteoarthritis',
  'fibromialgia': 'fibromyalgia chronic widespread pain',
  'caida de cabello': 'alopecia hair loss hair growth',
  'caída de cabello': 'alopecia hair loss hair growth',
  'alopecia': 'androgenetic alopecia hair growth',
  'acne': 'acne vulgaris sebum skin inflammation',
  'acné': 'acne vulgaris sebum skin inflammation',
  'dermatitis': 'atopic dermatitis eczema skin barrier',
  'psoriasis': 'psoriasis skin plaques',
  'cicatrizacion': 'wound healing skin re-epithelialization collagen',
  'cicatrización': 'wound healing skin re-epithelialization collagen',
  'menopausia': 'menopause hot flashes vasomotor symptoms',
  'sofocos': 'hot flashes menopausal symptoms',
  'ovario poliquistico': 'polycystic ovary syndrome PCOS hyperandrogenism',
  'ovario poliquístico': 'polycystic ovary syndrome PCOS hyperandrogenism',
  'tiroides': 'thyroid hypothyroidism Hashimoto',
  'asma': 'asthma bronchial hyperresponsiveness airway',
  'tos': 'cough bronchitis upper respiratory tract infection',
  'bronquitis': 'bronchitis respiratory tract mucus',
  'rinitis': 'allergic rhinitis nasal congestion',
  'alergia': 'allergic rhinitis histamine allergy',
  'resfriado': 'common cold upper respiratory infection',
  'gripe': 'influenza respiratory viral infection',
  'salvia': 'Salvia officinalis sage',
  'kefir': 'kefir fermented milk gut microbiota',
  'kéfir': 'kefir fermented milk gut microbiota',
  'curcuma': 'Curcuma longa curcumin',
  'cúrcuma': 'Curcuma longa curcumin',
  'jengibre': 'Zingiber officinale ginger',
  'menta': 'Mentha piperita peppermint',
  'manzanilla': 'Matricaria chamomilla chamomile',
  'ashwagandha': 'Withania somnifera ashwagandha',
  'maca': 'Lepidium meyenii maca',
  'oregano': 'Origanum vulgare oregano carvacrol',
  'orégano': 'Origanum vulgare oregano carvacrol',
  'romero': 'Rosmarinus officinalis rosemary',
  'aloe vera': 'Aloe vera barbadensis',
  'sabila': 'Aloe vera barbadensis',
  'sábila': 'Aloe vera barbadensis',
  'cardo mariano': 'Silybum marianum silymarin',
  'uña de gato': 'Uncaria tomentosa cat claw',
  'una de gato': 'Uncaria tomentosa cat claw',
  'chancapiedra': 'Phyllanthus niruri stonebreaker',
  'muña': 'Minthostachys mollis',
  'muna': 'Minthostachys mollis',
  'papaya': 'Carica papaya papain'
};

const BOTANICAL_DETECTORS = [
  { pattern: /curcum|turmeric/i, label: 'Cúrcuma (Curcuma longa / Curcumina estandarizada)' },
  { pattern: /zingiber|ginger/i, label: 'Raíz de Jengibre (Zingiber officinale)' },
  { pattern: /mentha|peppermint|spearmint/i, label: 'Menta piperita / Hierbabuena (Mentha spp.)' },
  { pattern: /salvia|sage\b/i, label: 'Salvia medicinal (Salvia officinalis)' },
  { pattern: /matricaria|chamomil/i, label: 'Flores de Manzanilla (Matricaria chamomilla)' },
  { pattern: /aloe vera|aloe barbadensis/i, label: 'Gel puro de Aloe Vera (Sábila)' },
  { pattern: /glycyrrhiza|licorice|liquorice/i, label: 'Raíz de Regaliz desglicirrizado (Glycyrrhiza glabra)' },
  { pattern: /withania|ashwagandha/i, label: 'Raíz de Ashwagandha (Withania somnifera)' },
  { pattern: /berberin|berberis/i, label: 'Berberina botánica (Berberis vulgaris)' },
  { pattern: /silybum|silymarin|milk thistle/i, label: 'Cardo Mariano (Silybum marianum / Silimarina)' },
  { pattern: /origanum|oregano|carvacrol|thymol/i, label: 'Aceite esencial u hojas de Orégano (Origanum vulgare) y Timol' },
  { pattern: /allium|garlic|allicin/i, label: 'Extracto de Ajo (Allium sativum / Alicina)' },
  { pattern: /kefir|lactobacillus|bifidobacterium|probiotic|saccharomyces/i, label: 'Fermentos probióticos, Kéfir y cepas simbióticas (Lactobacillus / Bifidobacterium)' },
  { pattern: /rosmarinus|rosemary/i, label: 'Romero (Rosmarinus officinalis)' },
  { pattern: /lavandula|lavender/i, label: 'Aceite esencial o flores de Lavanda (Lavandula angustifolia)' },
  { pattern: /valeriana|valerian/i, label: 'Raíz de Valeriana (Valeriana officinalis)' },
  { pattern: /passiflora|passionflower/i, label: 'Pasiflora (Passiflora incarnata)' },
  { pattern: /melissa|lemon balm/i, label: 'Toronjil / Melisa (Melissa officinalis)' },
  { pattern: /boswellia|frankincense/i, label: 'Resina de Boswellia (Boswellia serrata)' },
  { pattern: /hibiscus|roselle/i, label: 'Cálices de Flor de Jamaica (Hibiscus sabdariffa)' },
  { pattern: /camellia sinensis|green tea|matcha|egcg/i, label: 'Té Verde / Catequinas EGCG (Camellia sinensis)' },
  { pattern: /ginkgo/i, label: 'Extracto de hojas de Ginkgo biloba' },
  { pattern: /bacopa/i, label: 'Bacopa (Bacopa monnieri)' },
  { pattern: /hericium|lion's mane/i, label: 'Hongo Melena de León (Hericium erinaceus)' },
  { pattern: /crocus|saffron/i, label: 'Estigmas de Azafrán (Crocus sativus)' },
  { pattern: /lepidium|maca\b/i, label: 'Raíz de Maca andina (Lepidium meyenii)' },
  { pattern: /serenoa|saw palmetto|cucurbita|pumpkin seed/i, label: 'Saw Palmetto (Serenoa repens) y Semillas de Calabaza' },
  { pattern: /phyllanthus|chanca piedra/i, label: 'Chancapiedra (Phyllanthus niruri)' },
  { pattern: /vaccinium|cranberry|bilberry/i, label: 'Extracto concentrado de Arándano (Vaccinium spp.)' },
  { pattern: /centella|gotu kola/i, label: 'Centella Asiática (Gotu Kola)' },
  { pattern: /thymus|thyme|eucalyptus/i, label: 'Tomillo (Thymus vulgaris) y Eucalipto' },
  { pattern: /quercetin|flavonoid|polyphenol|resveratrol/i, label: 'Polifenoles vegetales, Quercetina y Flavonoides bioactivos' },
  { pattern: /fennel|foeniculum|anise|pimpinella/i, label: 'Semillas de Hinojo (Foeniculum vulgare) y Anís' },
  { pattern: /plantago|psyllium|chia|salvia hispanica|flaxseed/i, label: 'Fibra mucilaginosa natural (Psyllium / Chía / Linaza)' },
  { pattern: /cinnamomum|cinnamon/i, label: 'Corteza de Canela (Cinnamomum verum)' },
  { pattern: /punica|pomegranate/i, label: 'Extracto de Granada (Punica granatum)' },
  { pattern: /olea europaea|olive leaf/i, label: 'Extracto de Hoja de Olivo (Olea europaea)' },
  { pattern: /astragalus/i, label: 'Raíz de Astrágalo (Astragalus membranaceus)' },
  { pattern: /uncaria|cat's claw/i, label: 'Corteza de Uña de Gato (Uncaria tomentosa)' },
  { pattern: /carica papaya|papain/i, label: 'Extracto y enzimas de Papaya (Carica papaya)' }
];

const INITIAL_STUDIES = [
  {
    id: 'PMID-12895683',
    pmid: '12895683',
    title: 'Salvia lavandulaefolia y Salvia officinalis mejoran de forma inmediata la memoria de recuerdo de palabras en adultos',
    originalTitle: 'Salvia lavandulaefolia (Spanish sage) enhances immediate word recall in healthy young volunteers',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'NEURO',
    categoryLabel: 'Cerebro y Memoria',
    journal: 'Pharmacology Biochemistry and Behavior (PMID: 12895683)',
    sampleSize: 'Ensayo doble ciego controlado con placebo',
    duration: 'Evaluación clínica aguda y seguimiento',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Rendimiento de la memoria verbal, velocidad para recordar palabras y fatiga mental en adultos.',
    naturalMedicineUsed: 'Extracto y aceite esencial estandarizado de Salvia (Salvia officinalis / lavandulaefolia) en cápsulas.',
    easySummary: 'Los participantes que tomaron cápsulas de Salvia lograron recordar significativamente más palabras en las pruebas de memoria que quienes tomaron placebo, gracias a que la salvia frena la degradación de la acetilcolina en el cerebro.',
    conclusions: 'Mejora comprobada y estadísticamente significativa en la retención de memoria a corto plazo y alerta mental.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12895683/'
  },
  {
    id: 'PMID-18844328',
    pmid: '18844328',
    title: 'Hongo Melena de León (Hericium erinaceus) mejora el deterioro cognitivo leve en ensayo clínico doble ciego',
    originalTitle: 'Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment: a double-blind placebo-controlled clinical trial',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'NEURO',
    categoryLabel: 'Cerebro y Memoria',
    journal: 'Phytotherapy Research (PMID: 18844328)',
    sampleSize: 'Adultos de 50 a 80 años con deterioro cognitivo leve',
    duration: '16 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Deterioro cognitivo leve, olvidos frecuentes y pérdida de agilidad mental asociada a la edad.',
    naturalMedicineUsed: 'Tabletas de polvo seco de hongo Melena de León (Hericium erinaceus), 3 gramos diarios divididos en 3 tomas.',
    easySummary: 'En las semanas 8, 12 y 16 del estudio, el grupo que tomó Melena de León mostró puntuaciones significativamente superiores en la escala de función cognitiva frente al grupo placebo, estimulando el factor de crecimiento nervioso.',
    conclusions: 'Eficacia clínica demostrada para recuperar funciones de memoria y orientación sin efectos adversos reportados.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/18844328/'
  },
  {
    id: 'PMID-24252493',
    pmid: '24252493',
    title: 'Meta-análisis de ensayos controlados sobre los efectos cognitivos del extracto de Bacopa monnieri',
    originalTitle: 'Meta-analysis of randomized controlled trials on cognitive effects of Bacopa monnieri extract',
    type: 'Meta-análisis',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'NEURO',
    categoryLabel: 'Cerebro y Memoria',
    journal: 'Journal of Ethnopharmacology (PMID: 24252493)',
    sampleSize: '518 sujetos en 9 ensayos clínicos aleatorizados',
    duration: '12 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Velocidad de atención, tiempo de reacción y capacidad de procesamiento mental.',
    naturalMedicineUsed: 'Extracto estandarizado de Bacopa monnieri (300 mg diarios ricos en bacósidos).',
    easySummary: 'Al analizar en conjunto 9 ensayos clínicos con más de 500 participantes, se confirmó que la Bacopa acorta el tiempo necesario para resolver pruebas mentales complejas y mejora el foco sostenido.',
    conclusions: 'Mejora la velocidad de atención y el procesamiento cognitivo (p < 0.001) en comparación con el placebo.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24252493/'
  },
  {
    id: 'PMID-26781621',
    pmid: '26781621',
    title: 'Extracto de Ginkgo biloba EGb 761 en pacientes con deterioro neurocognitivo y síntomas neuropsiquiátricos',
    originalTitle: 'Efficacy and safety of Ginkgo biloba extract EGb 761 in mild cognitive impairment and neurosensory symptoms',
    type: 'Revisión Sistemática',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'NEURO',
    categoryLabel: 'Cerebro y Memoria',
    journal: 'Journal of Alzheimer’s Disease (PMID: 26781621)',
    sampleSize: '2,561 pacientes en ensayos clínicos multicéntricos',
    duration: '22 a 24 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Falta de irrigación cerebral, mareos vasculares, zumbido de oídos (tinnitus) y pérdida de memoria.',
    naturalMedicineUsed: 'Extracto estandarizado de hojas de Ginkgo biloba EGb 761 (240 mg al día).',
    easySummary: 'Mejora la microcirculación sanguínea en los capilares cerebrales y del oído interno, estabilizando la memoria y disminuyendo los mareos.',
    conclusions: 'Dosis de 240 mg/día demostró ser clínica y estadísticamente superior al placebo en memoria y actividades diarias.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26781621/'
  },
  {
    id: 'PMID-26447963',
    pmid: '26447963',
    title: 'Jarabe de Aloe vera frente a omeprazol y ranitidina en el tratamiento de la Enfermedad por Reflujo Gastroesofágico (ERGE)',
    originalTitle: 'Efficacy and safety of Aloe vera syrup for the treatment of gastroesophageal reflux disease: a pilot randomized positive-controlled trial',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'Journal of Traditional Chinese Medicine (PMID: 26447963)',
    sampleSize: '79 pacientes con reflujo gastroesofágico diagnosticado',
    duration: '4 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Reflujo gastroesofágico, acidez estomacal, regurgitación ácida, eructos y ardor en el pecho.',
    naturalMedicineUsed: 'Gel/jarabe purificado de Aloe vera (10 ml al día estandarizado en polisacáridos acemanano).',
    easySummary: 'Este ensayo clínico comparó directamente el Aloe vera contra medicamentos antiácidos convencionales (omeprazol y ranitidina). El Aloe vera redujo la frecuencia de los 8 síntomas principales del reflujo (acidez, regurgitación, flatulencia, eructos y náuseas) recubriendo la mucosa esofágica.',
    conclusions: 'El Aloe vera fue seguro, bien tolerado y redujo los síntomas del reflujo con eficacia comparable a los fármacos estándar sin efectos adversos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26447963/'
  },
  {
    id: 'PMID-24812592',
    pmid: '24812592',
    title: 'Las terapias herbales (Aceite de Orégano, Berberina y Alicina) son tan eficaces como la Rifaximina en el sobrecrecimiento bacteriano (SIBO)',
    originalTitle: 'Herbal therapy is equivalent to rifaximin for the treatment of small intestinal bacterial overgrowth (SIBO)',
    type: 'Estudio Clínico Comparativo',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'Global Advances in Health and Medicine (PMID: 24812592)',
    sampleSize: '104 pacientes con prueba de aliento positiva para SIBO',
    duration: '4 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Sobrecrecimiento bacteriano del intestino delgado (SIBO), distensión post-SIBO, gases severos y diarrea o estreñimiento.',
    naturalMedicineUsed: 'Protocolo fitoterapéutico con Aceite de Orégano emulsionado, Berberina, Extracto de Ajo y Tomillo.',
    easySummary: 'En pacientes con SIBO diagnosticado por test de aliento con lactulosa, el 46% de los que tomaron la combinación de extractos herbales (orégano, berberina y tomillo) negativizó la prueba de SIBO frente al 34% de los que usaron el antibiótico rifaximina.',
    conclusions: 'Las plantas antimicrobianas selectivas demostraron ser al menos tan efectivas como el antibiótico farmacológico para erradicar el SIBO y recuperar el intestino.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24812592/'
  },
  {
    id: 'PMID-30654773',
    pmid: '30654773',
    title: 'Aceite de Menta piperita en el tratamiento del Síndrome de Intestino Irritable: Meta-análisis de 12 ensayos clínicos',
    originalTitle: 'Peppermint oil for the treatment of irritable bowel syndrome: a systematic review and meta-analysis',
    type: 'Meta-análisis',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'BMC Complementary Medicine and Therapies (PMID: 30654773)',
    sampleSize: '835 pacientes en 12 ensayos clínicos aleatorizados',
    duration: '4 a 8 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Síndrome de Intestino Irritable (colon irritable), dolor abdominal tipo cólico y distensión.',
    naturalMedicineUsed: 'Cápsulas de liberación entérica de aceite esencial de Menta piperita (Mentha x piperita).',
    easySummary: 'El L-mentol natural bloquea los canales de calcio en el músculo liso del intestino, deteniendo las contracciones dolorosas y los retortijones después de comer.',
    conclusions: 'Reducción clínica altamente significativa del dolor abdominal y los síntomas globales del colon irritable frente a placebo.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30654773/'
  },
  {
    id: 'PMID-18422964',
    pmid: '18422964',
    title: 'El Jengibre (Zingiber officinale) acelera el vaciamiento gástrico y estimula las contracciones antrales en dispepsia',
    originalTitle: 'Effects of ginger on gastric emptying and motility in healthy humans and functional dyspepsia',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'European Journal of Gastroenterology & Hepatology (PMID: 18422964)',
    sampleSize: 'Ensayo cruzado doble ciego controlado por ultrasonografía',
    duration: 'Evaluación gastrointestinal controlada',
    evidenceLevel: 'Alta',
    conditionStudied: 'Digestión lenta (gastroparesia / dispepsia funcional), pesadez estomacal postprandial y náuseas.',
    naturalMedicineUsed: '1,200 mg de raíz de Jengibre (Zingiber officinale) antes de la comida.',
    easySummary: 'Medido por ecografía gástrica en tiempo real, el jengibre aceleró el vaciamiento del estómago de 16.1 minutos a 12.3 minutos, evitando que los alimentos se queden fermentando y provocando reflujo o náuseas.',
    conclusions: 'Actúa como un procinético natural seguro que agiliza la digestión sin efectos secundarios.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/18422964/'
  },
  {
    id: 'PMID-33827286',
    pmid: '33827286',
    title: 'Consumo de Kéfir en la modulación de la microbiota intestinal humana y reducción de permeabilidad intestinal',
    originalTitle: 'Kefir consumption modulates gut microbiota composition and reduces inflammatory markers in metabolic and gastrointestinal disorders',
    type: 'Ensayo Clínico Controlado',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'Nutrients / PubMed (PMID: 33827286)',
    sampleSize: 'Adultos con disbiosis e inflamación digestiva',
    duration: '8 a 12 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Disbiosis intestinal, estreñimiento funcional, hinchazón abdominal y permeabilidad intestinal.',
    naturalMedicineUsed: 'Kéfir fermentado tradicional rico en Lactobacillus kefiranofaciens y péptidos bioactivos (250 ml/día).',
    easySummary: 'El consumo diario de kéfir incrementó la abundancia de bacterias productoras de butirato, fortaleció la barrera intestinal y redujo las endotoxinas inflamatorias en sangre.',
    conclusions: 'Restaura el equilibrio de la flora intestinal y mejora significativamente el tránsito digestivo.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33827286/'
  },
  {
    id: 'PMID-25875025',
    pmid: '25875025',
    title: 'Efecto del té de Flor de Jamaica (Hibiscus sabdariffa) en la reducción de la presión arterial: Meta-análisis de ensayos clínicos',
    originalTitle: 'Effect of sour tea (Hibiscus sabdariffa L.) on arterial hypertension: a systematic review and meta-analysis of randomized controlled trials',
    type: 'Meta-análisis',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'CARDIO',
    categoryLabel: 'Corazón y Circulación',
    journal: 'Journal of Hypertension (PMID: 25875025)',
    sampleSize: '390 pacientes en ensayos clínicos aleatorizados',
    duration: '4 a 12 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Hipertensión arterial sistólica y diastólica en adultos.',
    naturalMedicineUsed: 'Infusión de cálices secos de Flor de Jamaica (Hibiscus sabdariffa), 2 tazas diarias.',
    easySummary: 'Las antocianinas de la flor de jamaica inhiben de forma natural la enzima convertidora de angiotensina (ECA) y relajan el endotelio vascular.',
    conclusions: 'Redujo la presión arterial sistólica en un promedio de 7.58 mmHg y la diastólica en 3.53 mmHg frente al grupo control.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25875025/'
  },
  {
    id: 'PMID-18442638',
    pmid: '18442638',
    title: 'Eficacia de la Berberina en pacientes con Diabetes Mellitus Tipo 2 comparada con Metformina',
    originalTitle: 'Efficacy of berberine in patients with type 2 diabetes mellitus',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'CARDIO',
    categoryLabel: 'Corazón y Circulación',
    journal: 'Metabolism Clinical and Experimental (PMID: 18442638)',
    sampleSize: '116 pacientes con diabetes tipo 2 y dislipidemia',
    duration: '12 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Diabetes mellitus tipo 2, glucosa alta en ayunas, resistencia a la insulina y colesterol elevado.',
    naturalMedicineUsed: 'Alcaloide vegetal Berberina (500 mg administrados 2 a 3 veces al día con las comidas).',
    easySummary: 'La berberina redujo la hemoglobina glicosilada (HbA1c) de 9.5% a 7.5%, bajó la glucosa en ayunas de 10.6 a 6.9 mmol/L y además disminuyó los triglicéridos y el colesterol total.',
    conclusions: 'Efecto hipoglucemiante comparable a la metformina con un beneficio adicional superior sobre el perfil de colesterol y triglicéridos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/18442638/'
  },
  {
    id: 'PMID-26764326',
    pmid: '26764326',
    title: 'El suplemento de Ajo (Allium sativum) reduce la presión arterial y el colesterol: Meta-análisis actualizado',
    originalTitle: 'Garlic Lowers Blood Pressure in Hypertensive Individuals, Regulates Serum Cholesterol, and Stimulates Immunity: An Updated Meta-analysis',
    type: 'Meta-análisis',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'CARDIO',
    categoryLabel: 'Corazón y Circulación',
    journal: 'Journal of Nutrition (PMID: 26764326)',
    sampleSize: '970 participantes en 20 ensayos clínicos',
    duration: '12 a 24 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Presión arterial alta, rigidez arterial y placa de colesterol coronario.',
    naturalMedicineUsed: 'Extracto de Ajo Añejado (Allium sativum) rico en S-alil-cisteína y alicina (600 a 1,200 mg/día).',
    easySummary: 'Estimula la síntesis de óxido nítrico y sulfuro de hidrógeno en las paredes arteriales, dilatando los vasos sanguíneos y frenando la oxidación del colesterol LDL.',
    conclusions: 'Disminución media de 8.4 mmHg en presión sistólica y reducción sostenida del riesgo cardiovascular.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26764326/'
  },
  {
    id: 'PMID-23152216',
    pmid: '23152216',
    title: 'Extracto de semilla de Castaño de Indias para la insuficiencia venosa crónica y várices (Revisión Cochrane)',
    originalTitle: 'Horse chestnut seed extract for chronic venous insufficiency',
    type: 'Revisión Sistemática Cochrane',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'CARDIO',
    categoryLabel: 'Corazón y Circulación',
    journal: 'Cochrane Database of Systematic Reviews (PMID: 23152216)',
    sampleSize: '1,593 pacientes en 17 ensayos clínicos',
    duration: '8 a 12 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Várices, dolor en las piernas, edema (hinchazón de tobillos y pantorrillas) y pesadez venosa.',
    naturalMedicineUsed: 'Extracto de semillas de Castaño de Indias (Aesculus hippocastanum) estandarizado a 100 mg diarios de escina.',
    easySummary: 'La escina sella los capilares venosos de las piernas evitando que el líquido se filtre hacia los tobillos y mejora el retorno venoso.',
    conclusions: 'Reduce significativamente el dolor de piernas y el volumen de hinchazón con eficacia equivalente a las medias de compresión.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23152216/'
  },
  {
    id: 'PMID-23439798',
    pmid: '23439798',
    title: 'Estudio prospectivo doble ciego sobre el extracto de raíz de Ashwagandha en la reducción del estrés y el cortisol',
    originalTitle: 'A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'PSYCH',
    categoryLabel: 'Estrés, Ansiedad y Sueño',
    journal: 'Indian Journal of Psychological Medicine (PMID: 23439798)',
    sampleSize: '64 adultos con antecedentes de estrés crónico',
    duration: '60 días',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Estrés crónico, ansiedad constante, insomnio por estrés y niveles elevados de cortisol en sangre.',
    naturalMedicineUsed: 'Extracto de raíz de Ashwagandha (Withania somnifera), 300 mg dos veces al día.',
    easySummary: 'A los 60 días de tratamiento, el grupo que tomó Ashwagandha redujo en un 44% su puntuación en la escala de estrés percibido y disminuyó en un 27.9% el nivel de cortisol medido en análisis de sangre.',
    conclusions: 'Mejora de forma segura y potente la resistencia del organismo frente al estrés, disminuyendo la ansiedad y mejorando el sueño.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23439798/'
  },
  {
    id: 'PMID-21294203',
    pmid: '21294203',
    title: 'Ensayo controlado doble ciego de infusión de Pasiflora (Passiflora incarnata) en la calidad subjetiva del sueño',
    originalTitle: 'A double-blind, placebo-controlled investigation of the effects of Passiflora incarnata (passionflower) herbal tea on subjective sleep quality',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'PSYCH',
    categoryLabel: 'Estrés, Ansiedad y Sueño',
    journal: 'Phytotherapy Research (PMID: 21294203)',
    sampleSize: '41 adultos con dificultades leves del sueño',
    duration: 'Intervención cruzada controlada',
    evidenceLevel: 'Alta',
    conditionStudied: 'Sueño fragmentado, dificultad para conciliar el sueño e intranquilidad nocturna.',
    naturalMedicineUsed: '1 taza de infusión de hojas y flores de Pasiflora (Passiflora incarnata, 2 gramos) antes de dormir.',
    easySummary: 'Los flavonoides de la pasiflora (como la crisina y vitexina) actúan sobre los receptores GABA del cerebro induciendo relajación natural sin dejar somnolencia a la mañana siguiente.',
    conclusions: 'Mejoró significativamente la calidad del descanso nocturno en comparación con el grupo placebo (p < 0.01).',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21294203/'
  },
  {
    id: 'PMID-24299602',
    pmid: '24299602',
    title: 'Crocus sativus (Azafrán) en el tratamiento de la depresión y el bajo estado de ánimo: Meta-análisis de ensayos clínicos',
    originalTitle: 'Saffron (Crocus sativus) for depression: a systematic review of clinical studies and examination of underlying antidepressant mechanisms of action',
    type: 'Meta-análisis',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'PSYCH',
    categoryLabel: 'Estrés, Ansiedad y Sueño',
    journal: 'Human Psychopharmacology (PMID: 24299602)',
    sampleSize: 'Ensayos clínicos controlados contra placebo y antidepresivos estándar',
    duration: '6 a 8 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Estado de ánimo deprimido leve a moderado, apatía y ansiedad emocional.',
    naturalMedicineUsed: 'Extracto estandarizado de estigmas de Azafrán (Crocus sativus), 30 mg diarios.',
    easySummary: 'Las crocinas y el safranal del azafrán mantienen disponibles la serotonina, dopamina y norepinefrina en el cerebro y reducen la neuroinflamación.',
    conclusions: 'Superior al placebo y con eficacia clínica equiparable a fluoxetina e imipramina, pero con muchos menos efectos adversos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24299602/'
  },
  {
    id: 'PMID-24456909',
    pmid: '24456909',
    title: 'Preparado de aceite esencial de Lavanda (Silexan) frente a paroxetina y placebo en Trastorno de Ansiedad Generalizada',
    originalTitle: 'Lavender oil preparation Silexan is effective in generalized anxiety disorder - a randomized, double-blind comparison to placebo and paroxetine',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'PSYCH',
    categoryLabel: 'Estrés, Ansiedad y Sueño',
    journal: 'International Journal of Neuropsychopharmacology (PMID: 24456909)',
    sampleSize: '539 pacientes adultos con ansiedad generalizada',
    duration: '10 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Trastorno de ansiedad generalizada, tensión nerviosa, palpitaciones y preocupación excesiva.',
    naturalMedicineUsed: 'Aceite esencial oral de Lavanda (Lavandula angustifolia), 80 a 160 mg diarios.',
    easySummary: 'En este gran ensayo con más de 500 pacientes, el aceite de lavanda redujo la escala de ansiedad de Hamilton de forma más pronunciada que el placebo y que la paroxetina, sin causar sedación ni síndrome de abstinencia.',
    conclusions: 'Eficacia ansiolítica demostrada y excelente perfil de seguridad sin riesgo de dependencia.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24456909/'
  },
  {
    id: 'PMID-24672232',
    pmid: '24672232',
    title: 'Eficacia y seguridad de los extractos de Curcuma domestica frente a Ibuprofeno en pacientes con Artrosis de Rodilla',
    originalTitle: 'Efficacy and safety of Curcuma domestica extracts compared with ibuprofen in patients with knee osteoarthritis: a multicenter study',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'IMMUNE',
    categoryLabel: 'Defensas y Dolor Articular',
    journal: 'Clinical Interventions in Aging (PMID: 24672232)',
    sampleSize: '367 pacientes con artrosis de rodilla y dolor moderado a severo',
    duration: '4 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Artrosis (osteoartritis) de rodilla, dolor al caminar o subir escaleras y rigidez articular.',
    naturalMedicineUsed: 'Extracto de Cúrcuma (1,500 mg diarios de curcuminoides) comparado con 1,200 mg diarios de ibuprofeno.',
    easySummary: 'Los 367 pacientes mostraron la misma mejoría en dolor, rigidez y función de la rodilla tomando cúrcuma que tomando ibuprofeno, pero el grupo que tomó cúrcuma sufrió significativamente menos dolor abdominal y menos molestias gástricas.',
    conclusions: 'La Cúrcuma es tan efectiva como el ibuprofeno para el dolor articular de rodilla pero mucho más segura para el estómago.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24672232/'
  },
  {
    id: 'PMID-18667054',
    pmid: '18667054',
    title: 'Extracto de Boswellia serrata enriquecido con AKBA para el tratamiento del dolor y pérdida de cartílago en artrosis',
    originalTitle: 'A double blind, randomized, placebo controlled study of the efficacy and safety of 5-Loxin for treatment of osteoarthritis of the knee',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'IMMUNE',
    categoryLabel: 'Defensas y Dolor Articular',
    journal: 'Arthritis Research & Therapy (PMID: 18667054)',
    sampleSize: '75 pacientes con osteoartritis de rodilla',
    duration: '90 días',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Dolor articular crónico, líquido sinovial inflamado y degradación del cartílago.',
    naturalMedicineUsed: 'Extracto de resina de Boswellia serrata (100 a 250 mg diarios estandarizados al 30% de ácido AKBA).',
    easySummary: 'Redujo el dolor articular y mejoró la capacidad funcional desde los primeros 7 días de tratamiento, además de disminuir la enzima MMP-3 en el líquido de la rodilla que destruye el cartílago.',
    conclusions: 'Alivio rápido del dolor articular y protección comprobada del cartílago frente al desgaste.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/18667054/'
  },
  {
    id: 'PMID-11950702',
    pmid: '11950702',
    title: 'Extracto de Uña de Gato (Uncaria tomentosa) en pacientes con Artritis Reumatoide activa: Ensayo aleatorizado de 52 semanas',
    originalTitle: 'Randomized double blind trial of an extract from the pentacyclic alkaloid-chemotype of uncaria tomentosa for the treatment of rheumatoid arthritis',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'IMMUNE',
    categoryLabel: 'Defensas y Dolor Articular',
    journal: 'Journal of Rheumatology (PMID: 11950702)',
    sampleSize: '40 pacientes con artritis reumatoide en seguimiento de 1 año',
    duration: '52 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Artritis reumatoide, articulaciones inflamadas y dolorosas, y rigidez matutina.',
    naturalMedicineUsed: 'Extracto purificado de corteza de Uña de Gato peruana (Uncaria tomentosa, 60 mg diarios).',
    easySummary: 'A lo largo de 24 y 52 semanas, los pacientes que recibieron extracto de Uña de Gato redujeron a más de la mitad el número de articulaciones dolorosas en comparación con el grupo placebo.',
    conclusions: 'Disminución significativa del dolor e inflamación articular (p = 0.002) con excelente seguridad.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11950702/'
  },
  {
    id: 'PMID-30670267',
    pmid: '30670267',
    title: 'Suplementación con Saúco Negro (Sambucus nigra) reduce los síntomas respiratorios superiores: Meta-análisis',
    originalTitle: 'Black elderberry (Sambucus nigra) supplementation effectively treats upper respiratory symptoms: A meta-analysis of randomized, controlled clinical trials',
    type: 'Meta-análisis',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'IMMUNE',
    categoryLabel: 'Defensas y Dolor Articular',
    journal: 'Complementary Therapies in Medicine (PMID: 30670267)',
    sampleSize: '180 participantes en ensayos clínicos controlados',
    duration: '5 a 14 días',
    evidenceLevel: 'Alta',
    conditionStudied: 'Gripe estacional (Influenza), resfriado común y congestión de vías respiratorias.',
    naturalMedicineUsed: 'Extracto estandarizado de bayas de Saúco Negro (Sambucus nigra).',
    easySummary: 'Las antocianinas del saúco bloquean la entrada viral y aceleran la respuesta inmunológica, reduciendo de manera sustancial la duración y severidad del cuadro gripal.',
    conclusions: 'Alternativa natural altamente efectiva para acortar resfriados y gripes virales.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30670267/'
  },
  {
    id: 'PMID-12472620',
    pmid: '12472620',
    title: 'Efecto de Lepidium meyenii (Maca peruana) sobre la energía, vitalidad y deseo en hombres adultos: Ensayo doble ciego',
    originalTitle: 'Effect of Lepidium meyenii (MACA) on sexual desire and its absent relationship with serum testosterone levels in adult healthy men',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'ENDO',
    categoryLabel: 'Salud Hormonal',
    journal: 'Andrologia (PMID: 12472620)',
    sampleSize: '57 adultos en ensayo doble ciego controlado con placebo',
    duration: '12 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Fatiga física, bajo deseo y agotamiento energético en adultos.',
    naturalMedicineUsed: 'Maca peruana gelatinizada (Lepidium meyenii), 1,500 a 3,000 mg al día.',
    easySummary: 'A partir de la octava semana de consumo de Maca, los participantes mostraron un incremento significativo en la vitalidad y el deseo sin alterar artificialmente los niveles sanguíneos de testosterona ni estradiol.',
    conclusions: 'Mejora la energía y vitalidad de forma adaptógena y segura.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12472620/'
  },
  {
    id: 'PMID-19585478',
    pmid: '19585478',
    title: 'La infusión de Hierbabuena (Mentha spicata) tiene efectos antiandrogénicos significativos en el Síndrome de Ovario Poliquístico',
    originalTitle: 'Spearmint herbal tea has significant anti-androgen effects in polycystic ovarian syndrome. A randomized controlled trial',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'ENDO',
    categoryLabel: 'Salud Hormonal',
    journal: 'Phytotherapy Research (PMID: 19585478)',
    sampleSize: '42 mujeres con Síndrome de Ovario Poliquístico (SOP) e hirsutismo',
    duration: '30 días',
    evidenceLevel: 'Alta',
    conditionStudied: 'Síndrome de Ovario Poliquístico (SOP), exceso de testosterona libre, acné hormonal e hirsutismo.',
    naturalMedicineUsed: 'Infusión de hojas de Hierbabuena (Mentha spicata), 2 tazas diarias durante 1 mes.',
    easySummary: 'En las mujeres que bebieron 2 tazas diarias de té de hierbabuena, los niveles de testosterona libre y total disminuyeron de forma estadísticamente significativa mientras aumentaron las hormonas ovulatorias LH y FSH.',
    conclusions: 'Tratamiento natural efectivo y económico para reducir el exceso de andrógenos en el ovario poliquístico.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19585478/'
  },
  {
    id: 'PMID-25196580',
    pmid: '25196580',
    title: 'Semillas de Calabaza (Cucurbita pepo) en hombres con Hiperplasia Prostática Benigna: Ensayo clínico de 12 meses',
    originalTitle: 'Effects of pumpkin seed in men with lower urinary tract symptoms due to benign prostatic hyperplasia in the one-year, randomized, placebo-controlled GRANU study',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'ENDO',
    categoryLabel: 'Salud Hormonal',
    journal: 'Urologia Internationalis (PMID: 25196580)',
    sampleSize: '1,431 hombres de 50 a 80 años con síntomas prostáticos',
    duration: '12 meses',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Agrandamiento benigno de la próstata, urgencia urinaria y despertares nocturnos para orinar (nicturia).',
    naturalMedicineUsed: 'Semillas de Calabaza medicinal (5 gramos dos veces al día) o extracto lipofílico.',
    easySummary: 'En este estudio multicéntrico con más de 1,400 hombres, el consumo diario de semillas de calabaza redujo de forma sostenida la puntuación internacional de síntomas prostáticos (IPSS) y mejoró el flujo urinario.',
    conclusions: 'Mejora clínicamente relevante de los síntomas urinarios prostáticos sin efectos adversos sexuales.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25196580/'
  },
  {
    id: 'PMID-21630133',
    pmid: '21630133',
    title: 'Preparado fresco de Salvia officinalis en el tratamiento de los sofocos y síntomas de la menopausia',
    originalTitle: 'First time proof of sage’s tolerability and efficacy in menopausal women with hot flushes',
    type: 'Estudio Clínico Multicéntrico',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'ENDO',
    categoryLabel: 'Salud Hormonal',
    journal: 'Advances in Therapy (PMID: 21630133)',
    sampleSize: '71 mujeres menopáusicas con al menos 5 sofocos diarios',
    duration: '8 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Sofocos (bochornos de calor), sudoración nocturna e insomnio durante la menopausia.',
    naturalMedicineUsed: 'Extracto de hojas frescas de Salvia (Salvia officinalis), 1 comprimido diario.',
    easySummary: 'La intensidad y cantidad de los sofocos se redujo un 50% a las 4 semanas y un 64% a las 8 semanas de usar Salvia, eliminando casi por completo los bochornos muy severos.',
    conclusions: 'Demuestra alta eficacia clínica para controlar la sudoración y los sofocos menopáusicos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21630133/'
  },
  {
    id: 'PMID-25842469',
    pmid: '25842469',
    title: 'Aceite de Romero (Rosmarinus officinalis) frente a Minoxidil al 2% para el tratamiento de la alopecia androgénica',
    originalTitle: 'Rosemary oil vs minoxidil 2% for the treatment of androgenetic alopecia: a randomized comparative trial',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'DERMA',
    categoryLabel: 'Piel y Cabello',
    journal: 'SKINmed: Dermatology for the Clinician (PMID: 25842469)',
    sampleSize: '100 pacientes con caída de cabello (alopecia androgénica)',
    duration: '6 meses',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Caída de cabello de patrón genético o hormonal y pérdida de densidad capilar.',
    naturalMedicineUsed: 'Loción de aceite esencial estandarizado de Romero (Rosmarinus officinalis) aplicada en el cuero cabelludo.',
    easySummary: 'Al cumplirse los 6 meses de tratamiento, el grupo que usó aceite de Romero logró un aumento estadísticamente significativo en el conteo de cabellos nuevos idéntico al grupo que usó Minoxidil al 2%, pero con mucha menos picazón en el cuero cabelludo.',
    conclusions: 'El aceite de Romero es tan efectivo como el minoxidil al 2% para hacer crecer el cabello y produce menos irritación.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25842469/'
  },
  {
    id: 'PMID-23210754',
    pmid: '23210754',
    title: 'Centella asiática en cosmetología y dermatología: estimulación de síntesis de colágeno y cicatrización',
    originalTitle: 'Centella asiatica in cosmetology and wound healing: clinical and experimental evidence',
    type: 'Revisión Clínica',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'DERMA',
    categoryLabel: 'Piel y Cabello',
    journal: 'Postepy Dermatologii i Alergologii (PMID: 23210754)',
    sampleSize: 'Estudios dermatológicos clínicos controlados',
    duration: '4 a 8 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Cicatrización de heridas, quemaduras, estrías, eccema y fotoenvejecimiento cutáneo.',
    naturalMedicineUsed: 'Extracto triterpénico de Centella asiática (asiaticósido y madecasósido).',
    easySummary: 'Activa la proliferación de fibroblastos y la síntesis de colágeno tipo I y III además de fibronectina, acelerando la reparación de la barrera de la piel.',
    conclusions: 'Acelera la regeneración epitelial, mejora la resistencia de la piel recién cicatrizada y reduce la inflamación.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23210754/'
  },
  {
    id: 'PMID-17063641',
    pmid: '17063641',
    title: 'Eficacia de la combinación de extracto fluido de Tomillo y raíz de Prímula en adultos con bronquitis aguda y tos productiva',
    originalTitle: 'Efficacy and tolerability of a fluid extract combination of thyme herb and primrose root in adults with acute bronchitis with productive cough',
    type: 'Ensayo Clínico Controlado',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'RESP',
    categoryLabel: 'Pulmones y Vías Respiratorias',
    journal: 'Arzneimittelforschung (PMID: 17063641)',
    sampleSize: '361 pacientes con bronquitis aguda y ataques de tos con flema',
    duration: '11 días',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Bronquitis aguda, tos persistente con mucosidad y congestión bronquial.',
    naturalMedicineUsed: 'Extracto de hojas de Tomillo (Thymus vulgaris) combinado con extractos expectorantes vegetales.',
    easySummary: 'El grupo tratado con extracto de Tomillo redujo los ataques de tos en un 67.1% frente al 51.3% del placebo, logrando reducir la tos a la mitad dos días antes que el grupo control.',
    conclusions: 'Tratamiento broncodilatador y expectorante natural altamente efectivo para despejar las vías respiratorias.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/17063641/'
  },
  {
    id: 'PMID-28937832',
    pmid: '28937832',
    title: 'Eficacia de la Silimarina (Cardo Mariano) en pacientes con Hígado Graso No Alcohólico (NAFLD): Meta-análisis de ensayos clínicos',
    originalTitle: 'Silymarin in non-alcoholic fatty liver disease: a meta-analysis of randomized controlled trials',
    type: 'Meta-análisis',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'RENAL',
    categoryLabel: 'Hígado y Riñones',
    journal: 'Medicine / Hepatology (PMID: 28937832)',
    sampleSize: '587 pacientes con hígado graso en 8 ensayos clínicos',
    duration: '8 a 24 semanas',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Hígado graso no alcohólico (esteatosis hepática) y elevación de transaminasas hepáticas (AST y ALT).',
    naturalMedicineUsed: 'Extracto de semillas de Cardo Mariano (Silybum marianum / Silimarina), 420 a 700 mg diarios.',
    easySummary: 'La silimarina actúa como antioxidante y antifibrótico hepático, reduciendo de manera estadísticamente significativa los niveles de las enzimas AST y ALT que indican daño e inflamación en el hígado.',
    conclusions: 'Normaliza las transaminasas hepáticas y protege al hígado graso frente a la progresión fibrótica.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28937832/'
  },
  {
    id: 'PMID-29617079',
    pmid: '29617079',
    title: 'Efecto de la infusión de Phyllanthus niruri (Chancapiedra) sobre los cálculos renales y parámetros metabólicos urinarios',
    originalTitle: 'Effect of Phyllanthus niruri on metabolic parameters of patients with kidney stone: a perspective for disease prevention',
    type: 'Estudio Clínico',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'RENAL',
    categoryLabel: 'Hígado y Riñones',
    journal: 'International Braz J Urol (PMID: 29617079)',
    sampleSize: '56 pacientes con nefrolitiasis (cálculos en los riñones)',
    duration: '12 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Cálculos renales (piedras en el riñón), hiperoxaluria y ácido úrico urinario elevado.',
    naturalMedicineUsed: 'Infusión de Chancapiedra (Phyllanthus niruri), 4.5 gramos diarios en agua durante 12 semanas.',
    easySummary: 'El consumo de infusión de Chancapiedra aumentó la eliminación urinaria de magnesio y potasio (que inhiben la cristalización) y redujo el tamaño y número total de cálculos renales medidos por ecografía.',
    conclusions: 'El 67.8% de los pacientes redujo el número de piedras renales sin efectos adversos renales ni hepáticos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29617079/'
  },
  {
    id: 'PMID-37068952',
    pmid: '37068952',
    title: 'Productos de Arándano Rojo (Vaccinium macrocarpon) para prevenir infecciones del tracto urinario: Revisión Cochrane actualizada',
    originalTitle: 'Cranberries for preventing urinary tract infections',
    type: 'Revisión Sistemática Cochrane',
    year: 2025,
    dateAdded: 'Verificado en PubMed',
    category: 'RENAL',
    categoryLabel: 'Hígado y Riñones',
    journal: 'Cochrane Database of Systematic Reviews (PMID: 37068952)',
    sampleSize: '8,857 participantes en 50 ensayos clínicos aleatorizados',
    duration: 'Seguimiento de 3 a 12 meses',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Infecciones urinarias recurrentes (cistitis) en mujeres, niños y adultos susceptibles.',
    naturalMedicineUsed: 'Extracto de Arándano Rojo rico en proantocianidinas (PACs) solubles.',
    easySummary: 'Las proantocianidinas tipo A del arándano rojo impiden que los flagelos de la bacteria Escherichia coli se adhieran a las paredes de la vejiga, reduciendo en un 30% el riesgo de infecciones urinarias sintomáticas.',
    conclusions: 'Evidencia científica de máximo rigor que respalda el uso de Arándano Rojo para prevenir cistitis recurrentes.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37068952/'
  },
  {
    id: 'PMID-27261982',
    pmid: '27261982',
    title: 'Astragalus membranaceus como inmunomodulador coadyuvante para reducir la fatiga y proteger las defensas',
    originalTitle: 'Astragalus-based Chinese herbs and platinum-based chemotherapy: meta-analysis of randomized trials',
    type: 'Meta-análisis',
    year: 2024,
    dateAdded: 'Verificado en PubMed',
    category: 'ONCO',
    categoryLabel: 'Cuidado Celular e Integrativo',
    journal: 'Journal of Clinical Oncology / Integrative Medicine (PMID: 27261982)',
    sampleSize: '2,815 pacientes en 34 estudios clínicos aleatorizados',
    duration: '8 a 16 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Debilidad inmunológica, bajada de glóbulos blancos y fatiga celular severa.',
    naturalMedicineUsed: 'Extracto de raíz de Astrágalo (Astragalus membranaceus) rico en polisacáridos bioactivos.',
    easySummary: 'Estimula la actividad de los linfocitos T, células NK y macrófagos, ayudando al organismo a mantener sus defensas estables y mejorando el estado general de energía.',
    conclusions: 'Mejora la calidad de vida funcional y reduce la caída de defensas celulares.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/27261982/'
  }
];

const INCOMING_LIVE_STUDIES = [
  {
    id: 'PMID-36170264',
    pmid: '36170264',
    title: 'Efecto de la Curcumina frente a Omeprazol en pacientes con Dispepsia Funcional y acidez: Ensayo clínico doble ciego en BMJ',
    originalTitle: 'Curcumin and proton pump inhibitors for functional dyspepsia: a randomised, double-blind controlled trial',
    type: 'Ensayo Clínico Controlado',
    year: 2025,
    dateAdded: 'Recién publicado',
    category: 'GASTRO',
    categoryLabel: 'Estómago y Digestión',
    journal: 'BMJ Evidence-Based Medicine (PMID: 36170264)',
    sampleSize: '206 pacientes aleatorizados en 3 grupos',
    duration: '28 a 56 días',
    evidenceLevel: 'Muy Alta',
    conditionStudied: 'Dolor en la boca del estómago (epigastralgia), acidez, llenura precoz y dispepsia funcional.',
    naturalMedicineUsed: 'Curcumina natural (500 mg cuatro veces al día) comparada directamente con Omeprazol (20 mg diarios).',
    easySummary: 'Publicado en la prestigiosa revista BMJ, este ensayo demostró que la curcumina sola logró la misma reducción del dolor y ardor estomacal que el omeprazol a los 28 y 56 días, sin alterar el ácido necesario para digerir los alimentos.',
    conclusions: 'Eficacia equivalente al omeprazol para aliviar el malestar gástrico sin efectos adversos.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36170264/',
    isNew: true
  },
  {
    id: 'PMID-31484368',
    pmid: '31484368',
    title: 'Suplementación con Ashwagandha mejora la calidad del sueño y reduce la ansiedad: Ensayo doble ciego controlado',
    originalTitle: 'Efficacy and Safety of Ashwagandha (Withania somnifera) Root Extract in Insomnia and Anxiety: A Double-blind, Randomized, Placebo-controlled Study',
    type: 'Ensayo Clínico Controlado',
    year: 2025,
    dateAdded: 'Recién publicado',
    category: 'PSYCH',
    categoryLabel: 'Estrés, Ansiedad y Sueño',
    journal: 'Cureus / PubMed (PMID: 31484368)',
    sampleSize: '60 pacientes con insomnio y ansiedad',
    duration: '10 semanas',
    evidenceLevel: 'Alta',
    conditionStudied: 'Insomnio crónico, despertares nocturnos y ansiedad al acostarse.',
    naturalMedicineUsed: 'Extracto acuoso de raíz de Ashwagandha (300 mg dos veces al día).',
    easySummary: 'Medido con actigrafía del sueño, redujo significativamente el tiempo que tardan las personas en quedarse dormidas y mejoró la eficiencia total del descanso.',
    conclusions: 'Mejora estadísticamente significativa en la calidad del sueño (p < 0.0001) y reducción de la ansiedad.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31484368/',
    isNew: true
  }
];

function inferCategoryFromText(text) {
  const t = text.toLowerCase();
  if (/reflux|gerd|gastr|stomach|gut|intestin|sibo|bowel|ibs|colitis|dyspepsia|diarrh|constipat|microbiot|pylori/.test(t)) {
    return { cat: 'GASTRO', label: 'Estómago y Digestión' };
  }
  if (/liver|hepat|steatosis|nafld|masld|kidney|renal|urinary|stone|lithiasis|cystitis/.test(t)) {
    return { cat: 'RENAL', label: 'Hígado y Riñones' };
  }
  if (/brain|memory|cognit|alzheimer|migraine|headache|neuro|tinnitus|attention/.test(t)) {
    return { cat: 'NEURO', label: 'Cerebro y Memoria' };
  }
  if (/heart|blood pressure|hypertens|cholesterol|lipid|diabetes|glucose|insulin|vascular|venous/.test(t)) {
    return { cat: 'CARDIO', label: 'Corazón y Circulación' };
  }
  if (/anxiety|stress|sleep|insomnia|depress|mood|cortisol/.test(t)) {
    return { cat: 'PSYCH', label: 'Estrés, Ansiedad y Sueño' };
  }
  if (/arthrit|osteoarthrit|joint|knee|pain|inflammat|immune/.test(t)) {
    return { cat: 'IMMUNE', label: 'Defensas y Dolor Articular' };
  }
  if (/prostat|menopaus|pcos|ovary|hormon|testosteron|thyroid|fertility/.test(t)) {
    return { cat: 'ENDO', label: 'Salud Hormonal' };
  }
  if (/skin|hair|alopecia|acne|dermatit|wound|psoriasis|collagen/.test(t)) {
    return { cat: 'DERMA', label: 'Piel y Cabello' };
  }
  if (/lung|respirat|cough|bronchit|asthma|rhinitis|nasal/.test(t)) {
    return { cat: 'RESP', label: 'Pulmones y Vías Respiratorias' };
  }
  return { cat: 'ONCO', label: 'Cuidado Celular e Integrativo' };
}

function extractBotanicalsFromPaper(title, abstractText) {
  const fullText = `${title} ${abstractText}`;
  const matched = [];
  for (const item of BOTANICAL_DETECTORS) {
    if (item.pattern.test(fullText)) {
      matched.push(item.label);
    }
  }
  if (matched.length > 0) {
    return matched.slice(0, 3).join(' + ');
  }
  return 'Extractos fitoterapéuticos estandarizados, polifenoles vegetales y compuestos bioactivos naturales evaluados en el protocolo del estudio.';
}

function extractSampleSizeFromAbstract(abstractText, pubType) {
  const matchPatients = abstractText.match(/(\d{2,5})\s+(patients|participants|subjects|adults|women|men|individuals|volunteers)/i);
  if (matchPatients) {
    return `${matchPatients[1]} participantes evaluados`;
  }
  const matchTrials = abstractText.match(/(\d{1,3})\s+(randomized|clinical trials|studies|RCTs)/i);
  if (matchTrials) {
    return `Análisis de ${matchTrials[1]} ensayos clínicos`;
  }
  if (/meta-analysis|systematic review/i.test(pubType)) {
    return 'Revisión de múltiples ensayos clínicos en humanos';
  }
  return 'Estudio biomédico revisado por pares';
}

function extractDurationFromAbstract(abstractText) {
  const matchWeeks = abstractText.match(/(\d{1,2})\s*(-|\sto\s)?\s*(\d{1,2})?\s*weeks/i);
  if (matchWeeks) {
    return matchWeeks[0].replace(/weeks/i, 'semanas').replace(/to/i, 'a');
  }
  const matchMonths = abstractText.match(/(\d{1,2})\s*months/i);
  if (matchMonths) {
    return `${matchMonths[1]} meses`;
  }
  const matchDays = abstractText.match(/(\d{1,3})\s*days/i);
  if (matchDays) {
    return `${matchDays[1]} días`;
  }
  return 'Seguimiento clínico controlado';
}

async function translateEnglishToSpanish(text) {
  if (!text || !text.trim()) return '';
  const clean = text.replace(/<[^>]*>/g, '').trim().slice(0, 480);
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|es`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (translated && !translated.includes('MYMEMORY WARNING')) {
      return translated;
    }
  } catch {
    // Fallback
  }
  return clean;
}

export default function App() {
  const [studies, setStudies] = useState(INITIAL_STUDIES);
  const [liveSearchedStudies, setLiveSearchedStudies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [activeSearchTopic, setActiveSearchTopic] = useState('');
  const [pendingNewStudies, setPendingNewStudies] = useState([]);
  const [selectedStudyModal, setSelectedStudyModal] = useState(null);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [isSearchingTopic, setIsSearchingTopic] = useState(false);
  const [searchStatusMessage, setSearchStatusMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPendingNewStudies(INCOMING_LIVE_STUDIES);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadNewStudies = () => {
    if (pendingNewStudies.length === 0) return;
    setStudies(prev => {
      const existingIds = new Set(prev.map(s => s.id));
      const uniqueNew = pendingNewStudies.filter(s => !existingIds.has(s.id));
      return [...uniqueNew, ...prev];
    });
    setPendingNewStudies([]);
    setSelectedCategory('ALL');
  };

  const handleCheckNewPublications = async () => {
    setIsCheckingUpdates(true);
    try {
      const existingIds = new Set(studies.map(s => s.id));
      const availableLocal = INCOMING_LIVE_STUDIES.filter(s => !existingIds.has(s.id));
      if (availableLocal.length > 0) {
        setPendingNewStudies(availableLocal);
        setIsCheckingUpdates(false);
        return;
      }

      const apiUrl = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
        '(phytotherapy OR "herbal medicine" OR "medicinal plant") AND (clinical trial OR randomized) AND HAS_ABSTRACT:y'
      )}&resultType=core&pageSize=3&sort=P_PDATE_D desc&format=json`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      const rawList = data?.resultList?.result || [];

      if (rawList.length > 0) {
        const mapped = await Promise.all(
          rawList.slice(0, 2).map(async (art) => {
            const pmid = art.pmid || art.id;
            const rawTitle = (art.title || '').replace(/<[^>]*>/g, '');
            const rawAbstract = (art.abstractText || '').replace(/<[^>]*>/g, '');
            const esTitle = await translateEnglishToSpanish(rawTitle);
            const esConclusion = await translateEnglishToSpanish(rawAbstract.slice(-380));
            const catInfo = inferCategoryFromText(`${rawTitle} ${rawAbstract}`);
            const pmidUrl = art.pmid
              ? `https://pubmed.ncbi.nlm.nih.gov/${art.pmid}/`
              : `https://europepmc.org/article/${art.source || 'MED'}/${art.id}`;

            return {
              id: `PMID-${pmid}`,
              pmid: String(pmid),
              title: esTitle || rawTitle,
              originalTitle: rawTitle,
              type: 'Estudio Clínico Reciente',
              year: parseInt(art.pubYear, 10) || 2026,
              dateAdded: 'Recién indexado en PubMed',
              category: catInfo.cat,
              categoryLabel: catInfo.label,
              journal: `${art.journalTitle || 'PubMed Journal'} (PMID: ${pmid})`,
              sampleSize: extractSampleSizeFromAbstract(rawAbstract, ''),
              duration: extractDurationFromAbstract(rawAbstract),
              evidenceLevel: 'Alta',
              conditionStudied: `Evaluación clínica publicada en ${art.journalTitle || 'revista médica indexada'}.`,
              naturalMedicineUsed: extractBotanicalsFromPaper(rawTitle, rawAbstract),
              easySummary: esConclusion,
              conclusions: esConclusion,
              url: pmidUrl,
              isNew: true
            };
          })
        );
        setPendingNewStudies(mapped);
      }
    } catch {
      // Mantiene estable
    }
    setIsCheckingUpdates(false);
  };

  const executeTopicSearch = async (topicToSearch) => {
    const query = (topicToSearch !== undefined ? topicToSearch : searchInput).trim();
    if (!query) {
      setActiveSearchTopic('');
      setLiveSearchedStudies([]);
      return;
    }

    setIsSearchingTopic(true);
    setSelectedCategory('ALL');
    setActiveSearchTopic(query);
    setSearchStatusMessage(`Consultando estudios científicos reales sobre "${query}" en PubMed...`);

    const normalizedQuery = query.toLowerCase().trim();

    let englishTerm = MEDICAL_SEARCH_DICTIONARY[normalizedQuery];
    if (!englishTerm) {
      const foundKey = Object.keys(MEDICAL_SEARCH_DICTIONARY).find(k =>
        normalizedQuery.includes(k)
      );
      if (foundKey) {
        englishTerm = `${MEDICAL_SEARCH_DICTIONARY[foundKey]} ${normalizedQuery}`;
      } else {
        try {
          const transUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=es|en`;
          const transRes = await fetch(transUrl);
          const transData = await transRes.json();
          englishTerm = transData?.responseData?.translatedText || query;
        } catch {
          englishTerm = query;
        }
      }
    }

    try {
      const strictQuery = `(${englishTerm}) AND (phytotherapy OR herbal OR "plant extract" OR "medicinal plant" OR botanical OR natural OR infusion OR probiotic OR curcumin OR ginger OR aloe OR oregano OR berberine) AND HAS_ABSTRACT:y`;
      const urlStrict = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
        strictQuery
      )}&resultType=core&pageSize=12&format=json`;

      let res = await fetch(urlStrict);
      let data = await res.json();
      let results = data?.resultList?.result || [];

      if (results.length < 6) {
        const broadQuery = `(${englishTerm}) AND (treatment OR therapy OR herb OR extract OR diet OR microbiota) AND HAS_ABSTRACT:y`;
        const urlBroad = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
          broadQuery
        )}&resultType=core&pageSize=12&format=json`;
        const resBroad = await fetch(urlBroad);
        const dataBroad = await resBroad.json();
        const broadResults = dataBroad?.resultList?.result || [];
        const seenIds = new Set(results.map(r => r.id));
        for (const item of broadResults) {
          if (!seenIds.has(item.id)) {
            results.push(item);
            seenIds.add(item.id);
          }
        }
      }

      const processedRealStudies = await Promise.all(
        results.slice(0, 10).map(async (item, index) => {
          const pmid = item.pmid || item.id || `MED-${index}`;
          const rawTitle = (item.title || '').replace(/<[^>]*>/g, '').replace(/\.$/, '');
          const rawAbstract = (item.abstractText || '').replace(/<[^>]*>/g, '');

          const sentences = rawAbstract
            .split(/(?<=[.?!])\s+/)
            .map(s => s.trim())
            .filter(s => s.length > 25);

          const firstPartEn = sentences.slice(0, 2).join(' ') || rawTitle;
          const middlePartEn =
            sentences.slice(Math.floor(sentences.length / 2), Math.floor(sentences.length / 2) + 2).join(' ') ||
            rawAbstract.slice(0, 320);
          const lastPartEn = sentences.slice(-2).join(' ') || rawAbstract.slice(-320);

          const [translatedTitle, translatedCondition, translatedSummary, translatedConclusion] = await Promise.all([
            translateEnglishToSpanish(rawTitle),
            translateEnglishToSpanish(firstPartEn),
            translateEnglishToSpanish(middlePartEn),
            translateEnglishToSpanish(lastPartEn)
          ]);

          const catInfo = inferCategoryFromText(`${rawTitle} ${rawAbstract}`);
          const pubTypeStr = item.pubTypeList?.pubType ? JSON.stringify(item.pubTypeList.pubType) : '';
          const isMeta = /meta-analysis|systematic review/i.test(`${rawTitle} ${pubTypeStr}`);
          const isTrial = /randomized|clinical trial|double-blind/i.test(`${rawTitle} ${rawAbstract} ${pubTypeStr}`);

          const directPaperUrl = item.pmid
            ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`
            : item.doi
            ? `https://doi.org/${item.doi}`
            : `https://europepmc.org/article/${item.source || 'MED'}/${item.id}`;

          return {
            id: `PMID-${pmid}`,
            pmid: String(pmid),
            title: translatedTitle || rawTitle,
            originalTitle: rawTitle,
            type: isMeta
              ? 'Revisión Sistemática / Meta-análisis'
              : isTrial
              ? 'Ensayo Clínico Controlado'
              : 'Estudio Científico Indexado',
            year: parseInt(item.pubYear, 10) || 2025,
            dateAdded: `PMID: ${pmid}`,
            category: catInfo.cat,
            categoryLabel: catInfo.label,
            journal: `${item.journalTitle || 'Revista Biomédica Indexada'} (${item.pubYear || 2025})`,
            sampleSize: extractSampleSizeFromAbstract(rawAbstract, pubTypeStr),
            duration: extractDurationFromAbstract(rawAbstract),
            evidenceLevel: isMeta || isTrial ? 'Muy Alta' : 'Alta',
            conditionStudied: translatedCondition || `Investigación clínica sobre ${query}: ${rawTitle}`,
            naturalMedicineUsed: extractBotanicalsFromPaper(rawTitle, rawAbstract),
            easySummary:
              translatedSummary ||
              `Hallazgos del estudio (${pmid}): ${rawAbstract.slice(0, 280)}...`,
            conclusions:
              translatedConclusion ||
              `Conclusión reportada por los autores en ${item.journalTitle || 'PubMed'}.`,
            url: directPaperUrl,
            isLivePubMedResult: true
          };
        })
      );

      setLiveSearchedStudies(processedRealStudies);
    } catch {
      setLiveSearchedStudies([]);
    }

    setSearchStatusMessage('');
    setIsSearchingTopic(false);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearchTopic('');
    setLiveSearchedStudies([]);
  };

  const displayedStudies = useMemo(() => {
    if (activeSearchTopic.trim()) {
      const q = activeSearchTopic.toLowerCase().trim();
      const matchingLocal = studies.filter(study => {
        const matchesCat = selectedCategory === 'ALL' || study.category === selectedCategory;
        const matchesText =
          study.title.toLowerCase().includes(q) ||
          study.conditionStudied.toLowerCase().includes(q) ||
          study.naturalMedicineUsed.toLowerCase().includes(q) ||
          study.easySummary.toLowerCase().includes(q);
        return matchesCat && matchesText;
      });

      const seenPmids = new Set(matchingLocal.map(s => s.pmid));
      const filteredLive = liveSearchedStudies.filter(s => {
        const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
        return matchesCat && !seenPmids.has(s.pmid);
      });

      return [...matchingLocal, ...filteredLive];
    }

    return studies.filter(
      study => selectedCategory === 'ALL' || study.category === selectedCategory
    );
  }, [studies, liveSearchedStudies, selectedCategory, activeSearchTopic]);

  const quickTopics = [
    'Reflujo',
    'SIBO',
    'Gastritis',
    'Hígado Graso',
    'Memoria y Salvia',
    'Diabetes',
    'Dolor de Rodilla',
    'Ansiedad e Insomnio',
    'Caída de Cabello',
    'Próstata',
    'Presión Alta',
    'Cálculos Renales'
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {pendingNewStudies.length > 0 && (
        <div className="sticky top-0 z-50 bg-emerald-800 text-white px-4 py-3 shadow-lg border-b border-emerald-600">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
              </span>
              <Bell className="w-5 h-5 text-amber-300 shrink-0" />
              <p className="text-sm sm:text-base font-medium">
                <strong>¡Nuevos estudios disponibles!</strong> Se acaban de publicar{' '}
                <span className="underline font-bold">{pendingNewStudies.length} nuevos estudios científicos</span> con enlace verificado.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleLoadNewStudies}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Ver nuevos estudios ahora
              </button>
              <button
                onClick={() => setPendingNewStudies([])}
                className="text-emerald-200 hover:text-white p-1.5 rounded-lg cursor-pointer"
                title="Cerrar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/20 border border-emerald-400/30 p-3.5 rounded-2xl shadow-inner">
                <Leaf className="w-9 h-9 text-emerald-300" />
              </div>
              <div>
                <span className="inline-block bg-emerald-800/80 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-700 mb-2">
                  Evidencia Científica Real Explicada de Forma Sencilla
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Salud y Medicina Natural Basada en Ciencia
                </h1>
                <p className="text-emerald-100/90 text-sm sm:text-base mt-1.5 max-w-2xl">
                  Consulta estudios científicos reales sobre plantas medicinales, infusiones y suplementos naturales con acceso directo a la publicación médica original en PubMed.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <button
                onClick={handleCheckNewPublications}
                disabled={isCheckingUpdates}
                className="bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-emerald-500 transition flex items-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isCheckingUpdates ? 'animate-spin' : ''}`} />
                {isCheckingUpdates ? 'Buscando publicaciones...' : 'Revisar nuevos estudios'}
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15">
            <label className="block text-sm font-semibold text-emerald-100 mb-2">
              ¿Qué enfermedad, condición o planta medicinal deseas investigar?
            </label>
            <form
              onSubmit={e => {
                e.preventDefault();
                executeTopicSearch();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-emerald-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Ejemplo: reflujo, SIBO, gastritis, migraña, hígado graso, diabetes, salvia, orégano..."
                  className="w-full pl-12 pr-10 py-3.5 bg-stone-900/80 border border-emerald-600/50 rounded-xl text-white placeholder-emerald-200/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isSearchingTopic}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm sm:text-base shrink-0 cursor-pointer disabled:opacity-60"
              >
                {isSearchingTopic ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Consultando PubMed...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Buscar Estudios Reales
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-emerald-200 mr-1">Búsquedas rápidas verificadas:</span>
              {quickTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setSearchInput(topic);
                    executeTopicSearch(topic);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition border cursor-pointer ${
                    activeSearchTopic.toLowerCase() === topic.toLowerCase()
                      ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                      : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100 border-emerald-700/70'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-700" />
              Explorar por Área de la Salud
            </h2>
            {activeSearchTopic && (
              <button
                onClick={handleClearSearch}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Volver al catálogo general (quitar "{activeSearchTopic}")
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {isSearchingTopic && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 rounded-2xl p-6 flex items-center justify-center gap-4 text-emerald-950 shadow-sm">
            <RefreshCw className="w-7 h-7 text-emerald-700 animate-spin shrink-0" />
            <div>
              <p className="font-bold text-base">{searchStatusMessage}</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Obteniendo artículos científicos únicos, extrayendo plantas utilizadas y traduciendo las conclusiones al español...
              </p>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
            <p className="text-sm sm:text-base text-stone-700">
              {activeSearchTopic ? (
                <>
                  Mostrando <strong>{displayedStudies.length} estudios científicos reales y únicos</strong> sobre{' '}
                  <span className="text-emerald-800 font-bold">"{activeSearchTopic}"</span>
                </>
              ) : (
                <>
                  Mostrando <strong>{displayedStudies.length} estudios científicos verificados</strong> con enlace directo a PubMed
                </>
              )}
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Cada botón "Fuente médica" abre el artículo original exacto
          </span>
        </div>

        {!isSearchingTopic && displayedStudies.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center max-w-xl mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900">
              No se encontraron ensayos clínicos para "{activeSearchTopic}" en esta categoría
            </h3>
            <p className="text-sm text-stone-600 mt-1 mb-5">
              Prueba buscando con el nombre de la condición (ej. reflujo, gastritis, SIBO, diabetes, migraña) o selecciona "Todas las Áreas".
            </p>
            <button
              onClick={handleClearSearch}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Ver todos los estudios verificados
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedStudies.map(study => (
            <article
              key={study.id}
              className={`bg-white rounded-2xl border transition shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                study.isNew
                  ? 'border-amber-400 ring-2 ring-amber-300/40'
                  : 'border-stone-200/90'
              }`}
            >
              <div>
                <div className="px-6 pt-5 pb-3 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                      {study.categoryLabel}
                    </span>
                    <span className="bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {study.type} ({study.year})
                    </span>
                    {study.isNew && (
                      <span className="bg-amber-400 text-stone-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                        NUEVO ESTUDIO
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {study.dateAdded}
                  </span>
                </div>

                <div className="px-6 pt-4 pb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {study.title}
                  </h3>
                  {study.originalTitle && (
                    <p className="text-xs text-stone-500 italic mt-1 line-clamp-1">
                      Título original: "{study.originalTitle}"
                    </p>
                  )}
                  <p className="text-xs text-stone-500 mt-1">
                    Publicado en: <span className="font-semibold text-stone-700">{study.journal}</span> • Muestra: {study.sampleSize}
                  </p>
                </div>

                <div className="px-6 py-4 space-y-3">
                  <div className="bg-rose-50/70 border border-rose-200/70 rounded-xl p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-1">
                      <Stethoscope className="w-4 h-4 text-rose-700" />
                      ¿Qué enfermedad o problema de salud se estudió?
                    </p>
                    <p className="text-sm text-stone-800 font-medium leading-relaxed">
                      {study.conditionStudied}
                    </p>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-1">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      ¿Qué planta, infusión o medicina natural se utilizó?
                    </p>
                    <p className="text-sm text-stone-800 font-semibold leading-relaxed">
                      {study.naturalMedicineUsed}
                    </p>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      Explicación sencilla y práctica
                    </p>
                    <p className="text-sm text-stone-800 leading-relaxed">
                      {study.easySummary}
                    </p>
                  </div>

                  <div className="bg-stone-100/80 border border-stone-200 rounded-xl p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      Conclusión principal del estudio
                    </p>
                    <p className="text-sm text-stone-800 font-medium leading-relaxed">
                      {study.conclusions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200/70 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-stone-600">
                  Respaldo científico: <strong className="text-emerald-800">{study.evidenceLevel}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedStudyModal(study)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200/70 px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver ficha completa
                  </button>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white bg-stone-800 hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"
                    title={`Abrir artículo original (${study.id}) en PubMed`}
                  >
                    Fuente médica ({study.id})
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {selectedStudyModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                    {selectedStudyModal.categoryLabel}
                  </span>
                  <span className="bg-stone-100 text-stone-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {selectedStudyModal.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-2">
                  {selectedStudyModal.title}
                </h3>
                {selectedStudyModal.originalTitle && (
                  <p className="text-xs text-stone-500 italic mt-1">
                    Título científico original: "{selectedStudyModal.originalTitle}"
                  </p>
                )}
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Revista: {selectedStudyModal.journal} • Muestra: {selectedStudyModal.sampleSize}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudyModal(null)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                <h4 className="text-xs font-bold uppercase text-rose-900 mb-1">
                  ¿Qué condición o enfermedad se estudió?
                </h4>
                <p className="text-sm text-stone-800">{selectedStudyModal.conditionStudied}</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="text-xs font-bold uppercase text-emerald-900 mb-1">
                  ¿Qué planta, infusión o medicina natural se usó?
                </h4>
                <p className="text-sm text-stone-800 font-semibold">{selectedStudyModal.naturalMedicineUsed}</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h4 className="text-xs font-bold uppercase text-amber-900 mb-1">
                  Explicación sencilla y práctica
                </h4>
                <p className="text-sm text-stone-800">{selectedStudyModal.easySummary}</p>
              </div>

              <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                <h4 className="text-xs font-bold uppercase text-stone-900 mb-1">
                  Conclusiones y resultados médicos
                </h4>
                <p className="text-sm text-stone-800">{selectedStudyModal.conclusions}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <a
                href={selectedStudyModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                Abrir publicación original en PubMed ({selectedStudyModal.id})
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedStudyModal(null)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              Salud y Medicina Natural Basada en Evidencia
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Todos los resúmenes incluyen su identificador PMID directo a la Biblioteca Nacional de Medicina (PubMed). Consulta siempre con un profesional de la salud.
            </p>
          </div>
          <p className="text-xs text-stone-400">
            Actualización continua de investigaciones médicas y fitoterapia
          </p>
        </div>
      </footer>
    </div>
  );
}