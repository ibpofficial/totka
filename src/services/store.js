// Centralized state persistence and mock backend engine for TOTKA Activewear
// Handles orders, user profile with live PRs, cart state, reviews, and tracking.

const STORAGE_KEYS = {
  CART: 'totka_cart_v2',
  ORDERS: 'totka_orders_v2',
  USER: 'totka_user_v2',
  REVIEWS: 'totka_reviews_v2',
  ACTIVE_PAGE: 'totka_active_page_v2',
};

export const INITIAL_USER = {
  isLoggedIn: true,
  name: 'Rohan Sharma',
  phone: '9876543210',
  email: 'rohan.lifter@gmail.com',
  lifterHandle: 'Rohan (210kg Deadlift)',
  akhada: 'North Delhi Iron Akhada, Pitampura',
  coins: 650,
  stats: {
    deadlift: '210 kg',
    squat: '180 kg',
    bench: '135 kg',
    bodyweight: '82 kg',
  },
  savedAddress: {
    name: 'Rohan Sharma',
    phone: '9876543210',
    street: 'Plot 42, Gali No. 4, Near Iron Akhada Gym',
    landmark: 'Opposite Tapri Chai Corner',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110006',
  },
  nazarShieldLevel: 'MAX (Level 99)',
};

export const INITIAL_ORDERS = [
  {
    id: 'TOTKA-AKHADA-9482',
    date: '28 Oct 2026',
    items: [
      {
        id: 'totka-01',
        name: 'Buri Nazar Waale, Tera Weight Drop',
        selectedSize: 'XL',
        gsm: 260,
        price: 1499,
        quantity: 1,
        image: '/totka-tshirt-main.png',
        colorName: 'Mineral Acid-Washed Charcoal',
      },
    ],
    subtotal: 1499,
    discount: 150,
    total: 1349,
    paymentMethod: 'UPI (Google Pay)',
    courier: 'BlueDart Air Express (Waybill: #BD-789021)',
    currentStep: 3, // 1 to 5
    status: 'In Highway Transit via Express Cargo',
    estimatedDelivery: 'Tomorrow, by 5:00 PM',
    blessing: 'Fresh Lemon-Needle Ward Attached',
    address: {
      name: 'Rohan Sharma',
      phone: '9876543210',
      street: 'Plot 42, Gali No. 4, Near Iron Akhada Gym',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110006',
    },
    trackingLogs: [
      {
        step: 1,
        title: 'Order Sealed & Ritual Verified',
        desc: 'Garment specs logged. Complimentary fresh Nimbu-Mirchi talisman bound to package.',
        hub: 'Totka Central Terminal, New Delhi',
        time: '28 Oct, 02:30 PM',
        completed: true,
      },
      {
        step: 2,
        title: '260 GSM French Terry Inspected',
        desc: 'Drop-shoulder silhouette steamed, collar warning tag checked, folded in craft box.',
        hub: 'Old Delhi Akhada Facility, Hub #3',
        time: '28 Oct, 05:15 PM',
        completed: true,
      },
      {
        step: 3,
        title: 'Dispatched in Hazard-Taped Craft Box',
        desc: 'Sealed with custom packing tape, free keychain enclosed, handed to BlueDart runner.',
        hub: 'Delhi Central Express Cargo Center',
        time: '29 Oct, 08:45 AM',
        completed: true,
      },
      {
        step: 4,
        title: 'In Transit via BlueDart Express Cargo',
        desc: 'En-route to the regional sorting center closest to your delivery address.',
        hub: 'Interstate Air Cargo Line #7',
        time: 'Expected by Midnight',
        completed: false,
      },
      {
        step: 5,
        title: 'Out for Akhada Doorstep Handover',
        desc: 'Delivery runner assigned for final mile handover with contactless verification.',
        hub: 'New Delhi Local Akhada Hub',
        time: 'Tomorrow, by 5:00 PM',
        completed: false,
      },
    ],
  },
  {
    id: 'TOTKA-AKHADA-8120',
    date: '14 Oct 2026',
    items: [
      {
        id: 'totka-02',
        name: 'Nimbu Totka Ritual Oversized Tee',
        selectedSize: 'L',
        gsm: 280,
        price: 1599,
        quantity: 1,
        image: '/totka-tshirt-white.png',
        colorName: 'Vintage Off-White',
      },
    ],
    subtotal: 1599,
    discount: 0,
    total: 1599,
    paymentMethod: 'Cash on Delivery (COD)',
    courier: 'Delhivery Surface (Waybill: #DL-448210)',
    currentStep: 5,
    status: 'Delivered to Akhada',
    estimatedDelivery: 'Delivered',
    blessing: 'Blessed Kala Dhaga Wristband',
    address: {
      name: 'Rohan Sharma',
      phone: '9876543210',
      street: 'Plot 42, Gali No. 4, Near Iron Akhada Gym',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110006',
    },
    trackingLogs: [
      {
        step: 1,
        title: 'Order Placed',
        desc: 'COD order confirmed via OTP.',
        hub: 'Old Delhi Hub',
        time: '14 Oct, 11:00 AM',
        completed: true,
      },
      {
        step: 5,
        title: 'Delivered & Handed Over',
        desc: 'Handover complete. Cash collected with zero hassle.',
        hub: 'New Delhi Akhada',
        time: '16 Oct, 03:20 PM',
        completed: true,
      },
    ],
  },
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Karan Saxena',
    pr: 'Deadlift 210 kg',
    city: 'Varanasi',
    stars: 5,
    verified: true,
    tag: 'PUMP COVER SURVIVOR',
    productName: 'Buri Nazar Waale Pump Cover (260 GSM)',
    quote: 'Wore the 260 GSM mineral charcoal pump cover on heavy pull day. The trainer who normally yells about hip hinge literally dropped his shaker cup. Fabric stays structured through 5 heavy triples. Zero stickiness.',
    date: '24 Oct 2026',
  },
  {
    id: 'rev-2',
    author: 'Aman & Rohan',
    pr: 'Bench 140 kg',
    city: 'New Delhi',
    stars: 5,
    verified: true,
    tag: 'TAPRI REGULARS',
    productName: 'Nimbu Totka Ritual Tee (280 GSM)',
    quote: 'The 280 GSM loopback terry is ridiculously thick. Ribbed collar does not sag even after violent pull-overs. The needle-pierced lemon graphic looks surreal in person, water-based ink that moves naturally with cotton.',
    date: '21 Oct 2026',
  },
  {
    id: 'rev-3',
    author: 'Vikram Raghavan',
    pr: 'Squat 190 kg',
    city: 'Bengaluru',
    stars: 5,
    verified: true,
    tag: 'MYSTERY BOX OWNER',
    productName: 'The Totka Mystery Box Kit',
    quote: 'Craft unboxing experience was art. Hazard tape, certificate, and the 3D silicone lemon-chilli keychain is now permanently fixed to my motorcycle key ring. Zero accidents, zero missed PRs.',
    date: '18 Oct 2026',
  },
];

export const StoreService = {
  // --- Cart ---
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  },

  // --- Orders ---
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  },
  saveOrder(newOrder) {
    try {
      const orders = this.getOrders();
      const updated = [newOrder, ...orders];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      return updated;
    } catch {
      return [newOrder];
    }
  },
  updateOrderStep(orderId, nextStep) {
    try {
      const orders = this.getOrders();
      const updated = orders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            currentStep: nextStep,
            status:
              nextStep === 1
                ? 'Order Sealed & Ritual Verified'
                : nextStep === 2
                ? 'Inspected & Packed in Hub #3'
                : nextStep === 3
                ? 'In Highway Transit via Express Cargo'
                : nextStep === 4
                ? 'Arrived at Regional Air Facility'
                : 'Out for Akhada Doorstep Handover',
          };
        }
        return ord;
      });
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // --- User Profile ---
  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  },
  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {}
  },

  // --- Reviews ---
  getReviews() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return data ? JSON.parse(data) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  },
  addReview(newReview) {
    try {
      const reviews = this.getReviews();
      const updated = [newReview, ...reviews];
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
      return updated;
    } catch {
      return [newReview];
    }
  },
};

