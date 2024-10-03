import Pusher from "pusher-js";

const pusher = new Pusher("18593b90bca32fcfd9f6", {
  cluster: "eu",
});

export default pusher;
