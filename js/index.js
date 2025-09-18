async function init() {
  const user = supabase.auth.user();
  if (user) {
    showProfile(user);
    loadRooms();
    loadPosts();
  }
}
init();

document.getElementById("google-login").onclick = async () => {
  const { user, error } = await supabase.auth.signIn({ provider: 'google' });
  if (error) alert(error.message);
};

document.getElementById("logout").onclick = async () => {
  await supabase.auth.signOut();
  location.reload();
};

function showProfile(user) {
  document.getElementById("auth-area").classList.add("hidden");
  document.getElementById("profile").classList.remove("hidden");
  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("rooms").classList.remove("hidden");

  document.getElementById("user-name").innerText = user.email;
  document.getElementById("user-avatar").src = user.user_metadata?.avatar_url || "assets/mascot.png";
  document.getElementById("user-trophies").innerText = `${0} trophies`;
}

function loadRooms() {
  const list = document.getElementById("room-list");
  list.innerHTML = `<li class="p-2 bg-gray-800 rounded">Room 101 <button class="btn">Join</button></li>`;
}

function loadPosts() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = `<div class="p-2 bg-gray-800 rounded">Welcome to Tyvila X&O!</div>`;
}

setInterval(() => {
  const now = new Date();
  const options = { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit", second: "2-digit" };
  document.getElementById("sast-time").innerText = now.toLocaleTimeString("en-ZA", options);
}, 1000);
