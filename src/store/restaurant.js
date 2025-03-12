import { createSlice } from "@reduxjs/toolkit";

const Store = {
    name: "restaurant",
    initialState: { loaded: false, data: {}, branches: [] },
  },
  reducers = (Store.reducers = {});

reducers.init = function (state, action) {
  state.loaded = true;
  action.payload.delivery_charges ||= 0;
  state.data = action.payload;
  window.localStorage.setItem("slug", action.payload.slug);

  const schedule_data = action.payload.schedule_data;

  if (schedule_data) {
    const workingHours = {};
    Object.keys(JSON.parse(schedule_data)).forEach(
      (day) => (workingHours[day] = schedule_data[day][0])
    );
    state.workingHours = workingHours;
  }
};

reducers.INIT_BRANCHES = function (state, action) {
  state.branches = action.payload;
};

// Action creators are generated for each case reducer function
export default createSlice(Store).reducer;
// "schedule_data": "{\"monday\":[{\"open\" :\"10:00\",\"close\" :\"19:01\"}],\"wednesday\":[{\"open\" :\"09:00\",\"close\" :\"21:00\"}]}",

// {
//   "id": 2,
//   "name": "حى السلامة",
//   "description": "حى السلامة",
//   "location_id": null,
//   "image": "/assets/img/restaurants/1726653862gVPq9JBGmm.jpg",
//   "rating": "5",
//   "delivery_time": "15",
//   "price_range": "15",
//   "is_pureveg": 1,
//   "slug": "h-alslam-jd-ghvbrhemioun0jy",
//   "placeholder_image": null,
//   "latitude": "21.583988075423967",
//   "longitude": "39.15741511526268",
//   "certificate": null,
//   "restaurant_charges": "0.00",
//   "delivery_charges": "20.00",
//   "address": "حى السلامة",
//   "pincode": null,
//   "landmark": "حى السلامة",
//   "sku": "17266538626T4rHNTaso",
//   "is_active": 1,
//   "is_accepted": 1,
//   "is_featured": 1,
//   "delivery_type": 1,
//   "delivery_radius": 100,
//   "delivery_charge_type": "FIXED",
//   "base_delivery_charge": null,
//   "base_delivery_distance": null,
//   "extra_delivery_charge": null,
//   "extra_delivery_distance": null,
//   "min_order_price": "0.00",
//   "is_notifiable": 0,
//   "auto_acceptable": 1,
//   "is_schedulable": 0,
//   "order_column": 1,
//   "custom_message": null,
//   "is_orderscheduling": false,
//   "custom_featured_name": null,
//   "accept_scheduled_orders": 0,
//   "schedule_slot_buffer": 30,
//   "zone_id": 1,
//   "free_delivery_subtotal": 250,
//   "custom_message_on_list": null,
//   "deleted_at": null,
//   "avgRating": "0",
//   "is_favorited": false
// }
