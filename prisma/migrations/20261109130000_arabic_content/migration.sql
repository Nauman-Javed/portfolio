-- Arabic translations for the existing content. Every statement only fills a
-- field that is still empty, so anything edited later in the admin is kept.

-- Profile
UPDATE "Profile" SET
  "name_ar"         = COALESCE("name_ar", 'نعمان جاويد قريشي'),
  "headline_ar"     = COALESCE("headline_ar", 'مهندس برمجيات'),
  "heroLead_ar"     = COALESCE("heroLead_ar", 'أصمّم وأبني'),
  "summary_ar"      = COALESCE("summary_ar", 'مهندس برمجيات. أحوّل الأفكار إلى تطبيقات ويب سريعة وسهلة الوصول باستخدام Next.js وNode.js.'),
  "about_ar"        = COALESCE("about_ar", 'مهندس برمجيات يتمتع بخبرة عملية في بناء لوحات تحكم عالية الأداء وتطبيقات ويب موجّهة للمستخدمين باستخدام React.js وNext.js. أتقن TypeScript وتكامل واجهات API وإدارة حالة الواجهة الأمامية، مع خبرة عملية في الواجهة الخلفية باستخدام Node.js وExpress.js وPostgreSQL. أعمل بارتياح مع أطر JavaScript الحديثة وأتعاون بفعالية ضمن فرق متعددة التخصصات.'),
  "location_ar"     = COALESCE("location_ar", 'إسلام آباد، باكستان'),
  "availability_ar" = COALESCE("availability_ar", 'منفتح على فرص جديدة')
WHERE "id" = 'profile';

UPDATE "Profile" SET "heroPhrases_ar" = ARRAY[
  'لوحات تحكم سريعة',
  'واجهات API مرنة',
  'تطبيقات Next.js',
  'واجهات سهلة الوصول',
  'تطبيقات متكاملة',
  'مشاريع تُطلق فعلًا'
]
WHERE "id" = 'profile' AND cardinality("heroPhrases_ar") = 0;

-- Projects
UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'KeyU'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.'),
  "description_ar"      = COALESCE("description_ar", E'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.\nالتسجيل عبر الهوية الوطنية أو هوية المقيم أو جواز السفر، وربطه بمستويات ضمان الهوية')
WHERE "slug" = 'keyu';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'بوابة السائق'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'نظام لتسجيل السائقين والمنظمات وتفعيلها'),
  "description_ar"      = COALESCE("description_ar", E'نظام لتسجيل السائقين والمنظمات وتفعيلها\nلوحات تحكم قائمة على الأدوار\nتسجيل دخول بدون كلمة مرور عبر نفاذ')
WHERE "slug" = 'driver-s-portal';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'تبيان'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'منصة لمشاركة البيانات قائمة على الموافقة للمملكة العربية السعودية'),
  "description_ar"      = COALESCE("description_ar", E'منصة لمشاركة البيانات قائمة على الموافقة للمملكة العربية السعودية\nلوحات تحكم قائمة على الأدوار')
WHERE "slug" = 'tebyan-utrust';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'uFace'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'تسجيل الوجه والتحقق منه لتمكين الهيئة العامة للنقل من التفتيش العشوائي على سائقي التوصيل'),
  "description_ar"      = COALESCE("description_ar", E'تسجيل الوجه والتحقق منه لتمكين الهيئة العامة للنقل من التفتيش العشوائي على سائقي التوصيل\nلوحات تحكم قائمة على الأدوار')
WHERE "slug" = 'uface';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'موقع Operator Labs'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.'),
  "description_ar"      = COALESCE("description_ar", E'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.\nالتسجيل عبر الهوية الوطنية أو هوية المقيم أو جواز السفر، وربطه بمستويات ضمان الهوية')
WHERE "slug" = 'operator-labs-website';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'بوابة Operator Labs'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.'),
  "description_ar"      = COALESCE("description_ar", E'نظام مشابه لـ OAuth بنموذج خصوصية أقوى.\nالتسجيل عبر الهوية الوطنية أو هوية المقيم أو جواز السفر، وربطه بمستويات ضمان الهوية')
WHERE "slug" = 'operator-labs-portal';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'نسخة يوتيوب'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'شاهد مقاطع الفيديو عبر الإنترنت مع صفحات القنوات والتصنيفات وأقسام الفيديو.'),
  "description_ar"      = COALESCE("description_ar", 'تطبيق واجهة أمامية لمشاهدة مقاطع الفيديو عبر الإنترنت، مع صفحات للقنوات وتصنيفات مخصصة وأقسام للفيديو. مبني باستخدام React وMaterial UI، ويجلب البيانات من Rapid API ويعرض الإشعارات عبر React Toastify.')
WHERE "slug" = 'youtube-clone';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'Car Hub'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'ابحث عن السيارات وتصفحها عبر واجهة حديثة ومتجاوبة.'),
  "description_ar"      = COALESCE("description_ar", 'تطبيق واجهة أمامية يتيح للمستخدمين البحث عن السيارات بسلاسة. مبني باستخدام Next.js، بواجهة مستخدم حديثة ومتجاوبة مصممة باستخدام Tailwind CSS وHeadless UI، وبيانات السيارات من Rapid API.')
WHERE "slug" = 'car-hub';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'كتاب الوصفات'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'أدِر وصفاتك بعمليات CRUD كاملة ومصادقة Firebase.'),
  "description_ar"      = COALESCE("description_ar", 'تطبيق واجهة أمامية لإدارة الوصفات بعمليات CRUD الأساسية. مبني باستخدام React وBootstrap 5، مع Context API وreducers لإدارة الحالة، ومصادقة Firebase لتسجيل الدخول، وReact Toastify للإشعارات.')
WHERE "slug" = 'recipe-book';

UPDATE "Project" SET
  "title_ar"            = COALESCE("title_ar", 'Task.io'),
  "shortDescription_ar" = COALESCE("shortDescription_ar", 'مدير مهام يومي بعمليات CRUD الأساسية.'),
  "description_ar"      = COALESCE("description_ar", 'تطبيق واجهة أمامية لإدارة المهام اليومية بعمليات CRUD الأساسية. مبني باستخدام React وMaterial UI، مع Context API وreducers لإدارة الحالة وMoment.js للتواريخ.')
WHERE "slug" = 'task-io';

-- Experience
UPDATE "Experience" SET
  "company_ar"  = COALESCE("company_ar", 'يوتراست'),
  "role_ar"     = COALESCE("role_ar", 'مطوّر واجهات أمامية'),
  "location_ar" = COALESCE("location_ar", 'المملكة العربية السعودية')
WHERE "company" = 'Utrust';

UPDATE "Experience" SET "bullets_ar" = ARRAY[
  'بناء لوحات تحكم عالية الأداء باستخدام Next.js مع العرض من جهة الخادم وجلب البيانات للمحتوى الموثّق والفوري.',
  'دمج واجهات RESTful API لعرض البيانات الديناميكية وتنفيذ Chart.js لتصوير البيانات بشكل تفاعلي.',
  'تحسين أداء التطبيق بمنع استدعاءات API المتكررة عند تغيير المسارات، مما قلّل الحمل على الشبكة.',
  'تنسيق مكونات الواجهة باستخدام Styled Components مع الحفاظ على فصل واضح بين المنطق والعرض.'
]
WHERE "company" = 'Utrust' AND cardinality("bullets_ar") = 0;

UPDATE "Experience" SET
  "company_ar"  = COALESCE("company_ar", 'Operator Labs'),
  "role_ar"     = COALESCE("role_ar", 'مهندس برمجيات متكامل (Full Stack)'),
  "location_ar" = COALESCE("location_ar", 'إسلام آباد، باكستان')
WHERE "company" = 'Operator Labs';

UPDATE "Experience" SET "bullets_ar" = ARRAY[
  'تحديد وحل اختناقات أداء الواجهة الأمامية عبر تقسيم الشيفرة والتحميل الكسول ومكونات الخادم، مما قلّل زمن التحميل الأولي.',
  'إعادة هيكلة الشيفرة الحالية باستخراج مكونات واجهة مخصصة قابلة لإعادة الاستخدام، مما حسّن قابلية الصيانة وقلّل التكرار.',
  'التعاون مع فرق متعددة التخصصات تشمل مهندسي الواجهة الخلفية والذكاء الاصطناعي لدمج الميزات وتقديم تجربة منتج متكاملة.',
  'المساهمة في تطوير الواجهتين الأمامية والخلفية للمنتج، بما في ذلك بناء ميزات خلفية مثل واجهات RESTful API وترحيلات قواعد البيانات لدعم الوظائف الجديدة.'
]
WHERE "company" = 'Operator Labs' AND cardinality("bullets_ar") = 0;

UPDATE "Experience" SET
  "company_ar"  = COALESCE("company_ar", 'مركز الأبحاث المتقدمة في الهندسة'),
  "role_ar"     = COALESCE("role_ar", 'مطوّر واجهات أمامية'),
  "location_ar" = COALESCE("location_ar", 'إسلام آباد')
WHERE "company" = 'Center for Advance Research in Engineering';

UPDATE "Experience" SET "bullets_ar" = ARRAY[
  'تصميم وبناء مكونات واجهة سهلة الوصول وقابلة لإعادة الاستخدام باستخدام React وTypeScript وTailwind CSS وShadcn، لضمان لغة تصميم متسقة عبر المشاريع.',
  'المساهمة في بناء واجهات سريعة التحميل تراعي الأجهزة المحمولة أولًا وتتوافق مع مواصفات تجربة المستخدم من تصاميم Figma وAdobe XD.'
]
WHERE "company" = 'Center for Advance Research in Engineering' AND cardinality("bullets_ar") = 0;

-- Skill categories
UPDATE "Skill" SET "category_ar" = 'الواجهة الأمامية' WHERE "category" = 'Frontend' AND "category_ar" IS NULL;
UPDATE "Skill" SET "category_ar" = 'قواعد البيانات' WHERE "category" = 'Databases' AND "category_ar" IS NULL;
UPDATE "Skill" SET "category_ar" = 'الواجهة الخلفية' WHERE "category" = 'Backend' AND "category_ar" IS NULL;
UPDATE "Skill" SET "category_ar" = 'التحكم في الإصدارات' WHERE "category" = 'Version control' AND "category_ar" IS NULL;
UPDATE "Skill" SET "category_ar" = 'الأدوات والممارسات' WHERE "category" = 'Tools & practices' AND "category_ar" IS NULL;

-- Education
UPDATE "Education" SET
  "institution_ar" = COALESCE("institution_ar", 'جامعة كابيتال للعلوم والتكنولوجيا'),
  "degree_ar"      = COALESCE("degree_ar", 'بكالوريوس في علوم الحاسب')
WHERE "institution" = 'Capital University of Science and Technology';
