export const services = [
  {
    id: 1,
    name: "Google Services",
    image: "/images/services/google.png",
    description: "Google My Business setup, optimization, ranking & management.",
    path: "/subservice/1/subservices", // CHANGED: /service → /subservice
    subservices: [
      {
        id: 101,
        name: "Google Listing",
        image: "/images/subservices/google/listing.png",
        description: "Create and verify your Google Business profile.",
        path: "/subservice/1/detail/101", // CHANGED: /service → /subservice
        price: "Starting from ₹4,999"
      },
      {
        id: 102,
        name: "Google Listing Phone Number Live",
        image: "/images/subservices/google/phone.png",
        description: "Make phone number visible and active on listing.",
        path: "/subservice/1/detail/102", // CHANGED
        price: "Starting from ₹2,999"
      },
      {
        id: 103,
        name: "Google Listing SEO",
        image: "/images/subservices/google/seo.png",
        description: "Rank higher on Google search and maps.",
        path: "/subservice/1/detail/103", // CHANGED
        price: "Starting from ₹7,999/month"
      },
      {
        id: 104,
        name: "Google Listing Unsuspend",
        image: "/images/subservices/google/unsuspend.png",
        description: "Recover suspended Google Business profiles.",
        path: "/subservice/1/detail/104", // CHANGED
        price: "Starting from ₹3,999"
      },
      {
        id: 105,
        name: "Google Listing Ads",
        image: "/images/subservices/google/ads.png",
        description: "Promote business through Google Local Ads.",
        path: "/subservice/1/detail/105", // CHANGED
        price: "Starting from ₹9,999/month"
      },
      {
        id: 106,
        name: "Google Listing Handling",
        image: "/images/subservices/google/handling.png",
        description: "Monthly updates, posts & review management.",
        path: "/subservice/1/detail/106", // CHANGED
        price: "Starting from ₹5,999/month"
      },
      {
        id: 107,
        name: "Google Listing Others",
        image: "/images/subservices/google/others.png",
        description: "Other Google Business support and services.",
        path: "/subservice/1/detail/107", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 2,
    name: "Google Ads",
    image: "/images/services/googleads.png",
    description: "Paid Google Ads for leads, calls, sales and branding.",
    path: "/subservice/2/subservices", // CHANGED
    subservices: [
      {
        id: 201,
        name: "Call Ads",
        image: "/images/subservices/ads/call.png",
        description: "Direct call-based advertisements to increase calls.",
        path: "/subservice/2/detail/201", // CHANGED
        price: "Starting from ₹12,999/month"
      },
      {
        id: 202,
        name: "Website Leads Ads",
        image: "/images/subservices/ads/leads.png",
        description: "Generate high-quality leads through landing pages.",
        path: "/subservice/2/detail/202", // CHANGED
        price: "Starting from ₹14,999/month"
      },
      {
        id: 203,
        name: "Performance Ads",
        image: "/images/subservices/ads/performance.png",
        description: "Maximize ROI and conversions with smart campaigns.",
        path: "/subservice/2/detail/203", // CHANGED
        price: "Starting from ₹19,999/month"
      },
      {
        id: 204,
        name: "Store View Ads",
        image: "/images/subservices/ads/store.png",
        description: "Bring nearby customers to physical stores.",
        path: "/subservice/2/detail/204", // CHANGED
        price: "Starting from ₹9,999/month"
      },
      {
        id: 205,
        name: "Product Sale Ads",
        image: "/images/subservices/ads/sale.png",
        description: "Boost online product sales with shopping ads.",
        path: "/subservice/2/detail/205", // CHANGED
        price: "Starting from ₹15,999/month"
      },
      {
        id: 206,
        name: "Other",
        image: "/images/subservices/ads/other.png",
        description: "Any other customized Google Ads solution.",
        path: "/subservice/2/detail/206", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 3,
    name: "Website Development",
    image: "/images/services/webdev.png",
    description: "Modern responsive websites for all business needs.",
    path: "/subservice/3/subservices", // CHANGED
    subservices: [
      {
        id: 301,
        name: "Static Website",
        image: "/images/subservices/web/static.png",
        description: "Simple and fast websites for small businesses.",
        path: "/subservice/3/detail/301", // CHANGED
        price: "Starting from ₹8,999"
      },
      {
        id: 302,
        name: "Dynamic Website",
        image: "/images/subservices/web/dynamic.png",
        description: "Admin panel with real-time content updates.",
        path: "/subservice/3/detail/302", // CHANGED
        price: "Starting from ₹24,999"
      },
      {
        id: 303,
        name: "E-commerce Website",
        image: "/images/subservices/web/ecommerce.png",
        description: "Online store with payment and cart features.",
        path: "/subservice/3/detail/303", // CHANGED
        price: "Starting from ₹49,999"
      },
      {
        id: 304,
        name: "Other",
        image: "/images/subservices/web/other.png",
        description: "Custom web development solutions.",
        path: "/subservice/3/detail/304", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 4,
    name: "App Development",
    image: "/images/services/appdev.png",
    description: "Android & iOS applications for any business type.",
    path: "/subservice/4/subservices", // CHANGED
    subservices: [
      {
        id: 401,
        name: "Android App",
        image: "/images/subservices/app/android.png",
        description: "Native Android apps built with strong backend.",
        path: "/subservice/4/detail/401", // CHANGED
        price: "Starting from ₹79,999"
      },
      {
        id: 402,
        name: "iOS App",
        image: "/images/subservices/app/ios.png",
        description: "iPhone apps designed for premium users.",
        path: "/subservice/4/detail/402", // CHANGED
        price: "Starting from ₹89,999"
      },
      {
        id: 403,
        name: "Flutter App",
        image: "/images/subservices/app/flutter.png",
        description: "Cross-platform apps for Android & iOS.",
        path: "/subservice/4/detail/403", // CHANGED
        price: "Starting from ₹99,999"
      },
      {
        id: 404,
        name: "Other",
        image: "/images/subservices/app/other.png",
        description: "Custom mobile development services.",
        path: "/subservice/4/detail/404", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 5,
    name: "CRM Software",
    image: "/images/services/crm.png",
    description: "Smart software to manage customers & sales.",
    path: "/subservice/5/subservices", // CHANGED
    subservices: [
      {
        id: 501,
        name: "MLM Software",
        image: "/images/subservices/crm/mlm.png",
        description: "Multi-level marketing software with full tracking.",
        path: "/subservice/5/detail/501", // CHANGED
        price: "Starting from ₹1,49,999"
      },
      {
        id: 502,
        name: "Customise Software",
        image: "/images/subservices/crm/custom.png",
        description: "Fully custom business management systems.",
        path: "/subservice/5/detail/502", // CHANGED
        price: "Starting from ₹99,999"
      },
      {
        id: 503,
        name: "CRM Software",
        image: "/images/subservices/crm/crm.png",
        description: "Customer tracking, lead management automation.",
        path: "/subservice/5/detail/503", // CHANGED
        price: "Starting from ₹69,999"
      },
      {
        id: 504,
        name: "Other",
        image: "/images/subservices/crm/other.png",
        description: "Any customer solution as per business needs.",
        path: "/subservice/5/detail/504", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 6,
    name: "Video Editing",
    image: "/images/services/videoedit.png",
    description: "Best video editing for branding & marketing.",
    path: "/subservice/6/subservices", // CHANGED
    subservices: [
      {
        id: 601,
        name: "Short Video (Content Based)",
        image: "/images/subservices/video/short.png",
        description: "Reels, Shorts and social content editing.",
        path: "/subservice/6/detail/601", // CHANGED
        price: "Starting from ₹1,999/video"
      },
      {
        id: 602,
        name: "Outdoor Video",
        image: "/images/subservices/video/outdoor.png",
        description: "Outdoor shooting + cinematic editing.",
        path: "/subservice/6/detail/602", // CHANGED
        price: "Starting from ₹9,999/video"
      },
      {
        id: 603,
        name: "360° Virtual Tour",
        image: "/images/subservices/video/360.png",
        description: "360-degree virtual walkthrough for businesses.",
        path: "/subservice/6/detail/603", // CHANGED
        price: "Starting from ₹14,999"
      },
      {
        id: 604,
        name: "Other",
        image: "/images/subservices/video/other.png",
        description: "Any custom video creation and editing.",
        path: "/subservice/6/detail/604", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 7,
    name: "Celebrity Award",
    image: "/images/services/celebrityaward.png",
    description: "Celebrity appearances for events and businesses.",
    path: "/subservice/7/subservices", // CHANGED
    subservices: [
      {
        id: 701,
        name: "With Actress",
        image: "/images/subservices/celebrity/actress.png",
        description: "Award / promotion with a popular actress.",
        path: "/subservice/7/detail/701", // CHANGED
        price: "Starting from ₹2,99,999"
      },
      {
        id: 702,
        name: "With Actor",
        image: "/images/subservices/celebrity/actor.png",
        description: "Award / promotion with a Bollywood actor.",
        path: "/subservice/7/detail/702", // CHANGED
        price: "Starting from ₹3,99,999"
      },
      {
        id: 703,
        name: "Other",
        image: "/images/subservices/celebrity/other.png",
        description: "Other celebrity categories available.",
        path: "/subservice/7/detail/703", // CHANGED
        price: "Custom Quote"
      }
    ]
  },
  {
    id: 8,
    name: "Combo Services",
    image: "/images/services/combo.png",
    description: "Premium combos at affordable prices.",
    path: "/subservice/8/subservices", // CHANGED
    subservices: [
      {
        id: 801,
        name: "Combo – Google + Website",
        image: "/images/subservices/combo/googleweb.png",
        description: "Google listing + business website bundle.",
        path: "/subservice/8/detail/801", // CHANGED
        price: "Starting from ₹24,999"
      },
      {
        id: 802,
        name: "Combo – Ads + Video Editing",
        image: "/images/subservices/combo/adsvideo.png",
        description: "Ads management with monthly promo videos.",
        path: "/subservice/8/detail/802", // CHANGED
        price: "Starting from ₹34,999/month"
      },
      {
        id: 803,
        name: "Custom Combo Plan",
        image: "/images/subservices/combo/custom.png",
        description: "Customized service packs as per requirement.",
        path: "/subservice/8/detail/803", // CHANGED
        price: "Custom Quote"
      }
    ]
  }
];