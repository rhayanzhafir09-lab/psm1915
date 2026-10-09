const SUPABASE_URL = "https://cfidjbjxpfgxeotwxklw.supabase.co";
const SUPABASE_KEY = "sb_publishable_iEqcQMp0aJR1fekhUNRGzw_F97-gEI6";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const button = document.querySelector(".comment-form button");
const commentList = document.querySelector(".comment-list");


// MENAMPILKAN KOMENTAR
async function loadComments() {

    const { data, error } = await supabaseClient
        .from("comments")
        .select("id, name, comment, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Gagal mengambil komentar:", error);
        return;
    }

    commentList.innerHTML = "";

    data.forEach(item => {

        const commentBox = document.createElement("div");
        commentBox.className = "comment";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const text = document.createElement("p");
text.textContent = item.comment;

const date = document.createElement("small");

const waktu = new Date(item.created_at);

date.textContent = waktu.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});

commentBox.appendChild(name);
commentBox.appendChild(date);
commentBox.appendChild(text);

        commentList.appendChild(commentBox);
    });
}


// MENGIRIM KOMENTAR
button.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
        alert("Nama dan komentar harus diisi!");
        return;
    }

    button.disabled = true;

    const { error } = await supabaseClient
        .from("comments")
        .insert([
            {
                name: name,
                comment: comment
            }
        ]);

    button.disabled = false;

    if (error) {
        console.error("Gagal mengirim komentar:", error);
        alert("Komentar gagal dikirim!");
        return;
    }

    nameInput.value = "";
    commentInput.value = "";

    alert("Komentar berhasil dikirim!");

    loadComments();
});


// LOAD KOMENTAR SAAT WEBSITE DIBUKA
loadComments();