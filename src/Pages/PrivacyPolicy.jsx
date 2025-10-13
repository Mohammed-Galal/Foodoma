import { getActiveLang } from "../translation";

const sections = [],
  isAr = getActiveLang() === "العربية";

const defaultLabels = {
  label: "سياسة الخصوصية",
  subTitle: "سياسة الخصوصية لموقع Montana.sa",
  text: "نحن في Montana نلتزم بحماية خصوصية بياناتك الشخصية والحفاظ على سريتها. تصف هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند زيارتك لموقعنا أو استخدامك لخدماتنا.",
};

if (!isAr) {
  Object.assign(defaultLabels, {
    label: "Privacy Policy",
    subTitle: "Privacy Policy for Montana.sa",
    text: "At Montana, we are committed to protecting your personal data and maintaining your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.",
  });
}

export default () => {
  return (
    <section className="container">
      <h1
        className="h2"
        style={{
          textAlign: "center",
          color: "var(--primary)",
          fontWeight: "600",
        }}
      >
        {defaultLabels.label}
      </h1>

      <h2 className="h4 mt-4">{defaultLabels.subTitle}</h2>

      {defaultLabels.text}

      <ol
        className="d-flex flex-column gap-3 m-0 px-3 mt-3"
        style={{ textAlign: "justify" }}
      >
        {sections.map(Section)}
      </ol>
    </section>
  );
};

function Section({ label, subTitle, items }) {
  return (
    <li key={label}>
      <h3>{label}</h3>
      {subTitle}

      <ul
        className="mt-2"
        style={{ paddingInline: 0, paddingInlineStart: "1.5rem" }}
      >
        {items.map((t, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: t }}></li>
        ))}
      </ul>
    </li>
  );
}

if (isAr) {
  new sectionObj("جمع المعلومات", null, [
    "قد نقوم بجمع بعض البيانات الشخصية التي تقدمها لنا بشكل مباشر عند التسجيل أو التواصل معنا، مثل: الاسم، البريد الإلكتروني، رقم الهاتف.",
    "نقوم أيضًا بجمع بعض المعلومات غير المباشرة بشكل تلقائي عند استخدامك للموقع، مثل: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، وقت وتاريخ الزيارة.",
  ]);

  new sectionObj(
    "استخدام المعلومات",
    "نستخدم البيانات التي يتم جمعها للأغراض التالية:",
    [
      "تحسين تجربة المستخدم وتطوير خدماتنا.",
      "الرد على استفساراتك وتقديم الدعم الفني.",
      "إرسال إشعارات أو تحديثات مهمة متعلقة بخدماتنا.",
      "الالتزام بالمتطلبات القانونية والتنظيمية.",
    ]
  );

  new sectionObj("مشاركة المعلومات", null, [
    "لا نقوم ببيع أو تأجير بياناتك الشخصية لأي طرف ثالث.",
    "قد نشارك بياناتك مع مزودي الخدمات الموثوقين الذين يساعدوننا في تشغيل الموقع أو تقديم الخدمات، وذلك في حدود ما يلزم فقط.",
    "قد نكشف عن معلوماتك عند طلب الجهات الرسمية أو إذا كان ذلك مطلوبًا بموجب القانون.",
  ]);

  new sectionObj(
    "حماية المعلومات",
    "نستخدم مجموعة من الإجراءات التقنية والتنظيمية المناسبة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التعديل.",
    []
  );

  new sectionObj(
    " ملفات تعريف الارتباط (Cookies)",
    "قد نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع، ويمكنك التحكم في إعدادات المتصفح لتعطيلها إن رغبت.",
    []
  );

  new sectionObj(
    "روابط لمواقع أخرى",
    "قد يحتوي موقعنا على روابط لمواقع خارجية، ونحن غير مسؤولين عن سياسات الخصوصية الخاصة بتلك المواقع. ننصحك بقراءة سياسات الخصوصية لكل موقع تقوم بزيارته.",
    []
  );

  new sectionObj("حقوقك", null, [
    "لك الحق في الوصول إلى بياناتك الشخصية أو تحديثها أو طلب حذفها.",
    "يمكنك التواصل معنا لطلب أي تعديل أو استفسار متعلق ببياناتك.",
  ]);

  new sectionObj(
    "التعديلات على سياسة الخصوصية",
    "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تعديل على هذه الصفحة مع تحديث تاريخ السريان.",
    []
  );

  new sectionObj(
    "بيانات التواصل",
    "إذا كان لديك أي استفسار بخصوص سياسة الخصوصية هذه، يمكنك التواصل معنا عبر:",
    [
      "البريد الإلكتروني: <a href='mailto:info@montana.sa'>info@montana.sa</a>",
      "أو عبر صفحة <a href='tel:+966920035416'>اتصل بنا</a> على موقعنا.",
    ]
  );
} else {
  new sectionObj("Information We Collect", null, [
    "We may collect personal information that you provide directly to us when you register or contact us, such as your name, email address, and phone number.",
    "We may also collect certain non-personal information automatically when you use our website, such as your IP address, browser type, date, and time of visit.",
  ]);

  new sectionObj(
    "How We Use Information",
    "We use the collected information for the following purposes:",
    [
      "To improve user experience and develop our services.",
      "To respond to inquiries and provide customer support.",
      "To send important notifications or updates related to our services.",
      "To comply with legal and regulatory requirements.",
    ]
  );

  new sectionObj("Sharing of Information", null, [
    "We do not sell or rent your personal information to third parties.",
    "We may share your data with trusted service providers who assist us in operating the website or providing services, but only to the extent necessary.",
    "We may disclose your information if required by law or by official authorities.",
  ]);

  new sectionObj(
    "Data Protection",
    "We apply appropriate technical and organizational measures to protect your information from unauthorized access, loss, or modification.",
    []
  );

  new sectionObj(
    "Cookies",
    "We may use cookies to enhance your experience on our website. You can manage or disable cookies through your browser settings if you prefer.",
    []
  );

  new sectionObj(
    "External Links",
    "Our website may contain links to external websites. We are not responsible for the privacy practices of those websites. We encourage you to read the privacy policy of each website you visit.",
    []
  );

  new sectionObj("Your Rights", null, [
    "You have the right to access, update, or request the deletion of your personal data.",
    "You may contact us to request any changes or for inquiries related to your data.",
  ]);

  new sectionObj(
    "Changes to This Policy",
    "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    []
  );

  new sectionObj(
    "Contact Information",
    "If you have any questions about this Privacy Policy, you may contact us at:",
    [
      "Email: <a href='mailto:info@montana.sa'>info@montana.sa</a>",
      "Or through our <a href='tel:+966920035416'>Contact Us</a> page",
    ]
  );
}

function sectionObj(label, subTitle, items) {
  sections.push(this);
  this.label = label;
  this.subTitle = subTitle;
  this.items = items;
}
