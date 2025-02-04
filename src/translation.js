const lang = window.localStorage.getItem("lang") || "ar",
  file = { ar: {} };

export default function getText(pageName, phraseIndex) {
  const fallback = file.ar[pageName][phraseIndex];

  try {
    return file[lang][pageName][phraseIndex] || fallback;
  } catch {
    return fallback;
  }
}

file.ar.home = [
  "أرقام نفتخر بها",
  "نحن نسهل عليك الحصول على أفضل خدمة أينما كنت. اطلب الآن للشحن نحن نسهل عليك الحصول على أفضل خدمة أينما كنت. اطلب الآن للشحن على مستوى البلاد، أو قدم طلبًا للاستلام من متجرك المحلي،",
  "أو تواصل مع فريقنا لترتيب خدمة تقديم الطعام المخصصة لمناسبتك القادمة.",
  "سنة خبرة",
  "عميل سعيد",
  "عمل طلب",
  "!صمم كيكتك بنفسك",
  `كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ
        نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية
        بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو
        الشوكولاتة.`,
  "جميع المنتجات", // 8
  "تصاميم جاهزة لكل مناسبة",
  "آراء عملائنا",
  "الطلبات الخاصة",
  "صمم المنتجات الخاصة بك بنفسك..",
  "عن طريق التحكم فى كافة الاضافات",
  "اطلب الآن",
  "الحجز المبكر",
  "خصم -15% على الحجز المبكر",
  "لكيكات اليوم الوطني السعودي",
  "احجز الآن",
  "المنتجات الجديدة",
  "المنتجات الأكثر مبيعاً",
  "أقسام مون 10",
  "تصاميم جاهزة المناسبات",
  "خدمات مون 10 الإضافية",
];

file.ar.alerts = ["تمييز الكل كمقروء"];

file.ar.bookings = [
  "كيكات اليوم الوطني السعودي",
  "ينتهي الحجز في",
  "يوم",
  "ساعة",
  "دقيقة",
  "خصم 15% على الحجز المبكر لكيكات اليوم الوطني",
  "منتجات ذات صلة",
];

file.ar.cart = [
  "السلة",
  "الدفع",
  "تأكيد الطلب",
  "أضف 100 ر.س للسلة وأحصل على 10 ر.س كاش باك",
  "المنتج",
  "الاضافات",
  "السعر",
  "العدد",
  "الاجمالي",
  "أضف",
  "إجمالي العربة",
  "إجمالي المنتجات",
  "الخصم",
  "الإجمالي",
  "بدون اضافات",
  "أكمل الدفع",
  "ر.س",
  "الطلب",
];

file.ar.product = [
  "خصم",
  "تمت اضافة المنتج الى العربة بنجاح",
  "متوفر",
  "غير متوفر",
  "للقطعة",
  "اكتب رأيك",
  "الإضافات",
  "اختر من الاصناف",
  "اضف الى العربة",
  "منتجات ذات صلة",
  "ر.س",
  "السعرات الحرارية",
];

file.ar.user = [
  "تسجيل الدخول",
  "أدخل بريدك الإلكتروني وكلمة المرور",
  "رقم الهاتف أو البريد الالكتروني",
  "كلمة المرور",
  "سجل دخول",
  "ليس لديك حساب بعد؟",
  "أنشئ حسابك الآن",
  "يرجى ملئ جميع البيانات",
  "إنشاء حساب جديد",
  "أنشئ حسابك الآن مجاناً",
  "الاسم",
  "البريد الالكتروني",
  "رقم الهاتف",
  "كلمة المرور",
  "أنشئ حسابك",
  "لديك حساب بالفعل؟",
  "سجل دخولك",
  "يرجى التحقق من البيانات المطلوبة",
];

file.ar.restaurant = [
  "يتطلب هذا الخيار تفعيل الـGPS",
  "اختيار أقرب مطعم",
  "اختار من فروعنا",
  "ابحث عن الفروع",
  "لم يتمكن المتصفح من تحديد موقعك",
];

file.ar.checkout = [
  "السلة",
  "الدفع",
  "تأكيد الطلب",
  "بيانات الاستلام",
  "طريقة الاستلام",
  "الاستلام من الفرع",
  "توصيل", // 6
  "ملاحظات",
  "حدث خطأ",
  "من الفرع",
  "عند الاستلام",
  "الطلب",
  "التوصيل",
  "الخصم",
  "الإجمالي",
  "أكمل الدفع",
  "ر.س",
];

file.ar.design = [
  "صمم كيكتك بنفسك",
  "أضف صورة",
  "العبارة على الكيك",
  "شكل آخر اكتبه في الملاحظات",
  "ملاحظات",
  "اضف الى العربة",
];

file.ar.productItem = ["خصم", "جديد", "للقطعة", "اضافة للسلة"];

file.en = {
  home: [
    "Numbers We Take Pride In",
    "We make it easy for you to get the best service wherever you are. Order now for nationwide shipping, or place an order for pickup from your local store,",
    "or contact our team to arrange a custom catering service for your next event.",
    "Years of Experience",
    "Happy Clients",
    "Orders Placed",
    "Design Your Own Cake",
    "The old-fashioned vanilla cake is the heart and soul of Magnolia Bakery. Here, we take\n" +
      "        the same batter we use to make our famous cupcakes to create a rich,\n" +
      "        buttery cake with a light crumb, layered with vanilla or\n" +
      "        chocolate buttercream.",
    "All Products",
    "Ready-Made Designs for Every Occasion",
    "Customer Reviews",
    "Custom Orders",
    "Design Your Own Products..",
    "By Controlling All Additions",
    "Order Now",
    "Early Booking",
    "15% Discount on Early Booking",
    "For Saudi National Day Cakes",
    "Book Now",
    "New Products",
    "Best-Selling Products",
    "Moon 10 Categories",
    "Ready-Made Occasion Designs",
    "Additional Moon 10 Services",
  ],
  alerts: ["Mark All as Read"],
  bookings: [
    "Saudi National Day Cakes",
    "Booking Ends In",
    "Days",
    "Hours",
    "Minutes",
    "15% Discount on Early Booking for National Day Cakes",
    "Related Products",
  ],
  cart: [
    "Cart",
    "Checkout",
    "Order Confirmation",
    "Add 100 SAR to Your Cart and Get 10 SAR Cashback",
    "Product",
    "Add-ons",
    "Price",
    "Quantity",
    "Total",
    "Add",
    "Cart Total",
    "Total Products",
    "Discount",
    "Grand Total",
    "No Add-ons",
    "Complete Payment",
    "SAR",
    "Order",
  ],
  product: [
    "Discount",
    "Product Added to Cart Successfully",
    "Available",
    "Unavailable",
    "Per Piece",
    "Write Your Review",
    "Add-ons",
    "Choose from Categories",
    "Add to Cart",
    "Related Products",
    "SAR",
  ],
  user: [
    "Login",
    "Enter Your Email and Password",
    "Phone Number or Email",
    "Password",
    "Sign In",
    "Don’t Have an Account Yet?",
    "Create Your Account Now",
    "Please Fill in All Fields",
    "Create a New Account",
    "Create Your Account for Free",
    "Name",
    "Email",
    "Phone Number",
    "Password",
    "Create Account",
    "Already Have an Account?",
    "Sign In",
    "Please Check the Required Fields",
  ],
  restaurant: [
    "This Option Requires GPS Activation",
    "Select the Nearest Restaurant",
    "Choose from Our Branches",
    "Search for Branches",
    "Browser Could Not Determine Your Location",
  ],
  checkout: [
    "Cart",
    "Checkout",
    "Order Confirmation",
    "Pickup Information",
    "Pickup Method",
    "Pickup from Branch",
    "Delivery",
    "Notes",
    "An Error Occurred",
    "From Branch",
    "On Pickup",
    "Order",
    "Delivery",
    "Discount",
    "Grand Total",
    "Complete Payment",
    "SAR",
  ],
  design: [
    "Design Your Own Cake",
    "Add Image",
    "Text on Cake",
    "Other Shape (Write in Notes)",
    "Notes",
    "Add to Cart",
  ],
};
