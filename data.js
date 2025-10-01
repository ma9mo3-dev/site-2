// التأكد من وجود مستخدم مسجل دخول
const currentUser = localStorage.getItem('current_user');
if (!currentUser) {
  window.location.href = 'index.html';
}

// جلب كل المستودعات المنشورة من المطورين
function loadRepos() {
  const container = document.getElementById('repos-container');
  container.innerHTML = ''; // تفريغ الحاوية قبل العرض

  // البحث في localStorage لكل المفاتيح اللي تبدأ بـ "repos_"
  for (let key in localStorage) {
    if (key.startsWith('repos_')) {
      const repos = JSON.parse(localStorage.getItem(key)) || [];

      repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo-item';

        // التحقق من القلوب والتعليقات
        const likesKey = `likes_${repo.name}_${repo.author}`;
        const commentsKey = `comments_${repo.name}_${repo.author}`;
        const likesCount = JSON.parse(localStorage.getItem(likesKey)) || 0;
        const commentsCount = JSON.parse(localStorage.getItem(commentsKey)) || [];

        repoDiv.innerHTML = `
          <strong>${repo.name}</strong><br>
          <small>👤 المطور: ${repo.author}</small><br>
          <small>🔗 API: <a href="${repo.api}" target="_blank" style="color:#00ffff">${repo.api}</a></small><br>
          <small>📄 الوصف: ${repo.desc}</small>
          <div class="repo-actions">
            <button onclick="toggleLike('${repo.name}','${repo.author')}'">
              ❤️ ${likesCount}
            </button>
            <button onclick="openComments('${repo.name}','${repo.author}')">
              💬 ${commentsCount.length}
            </button>
          </div>
        `;

        container.appendChild(repoDiv);
      });
    }
  }
}

// تحميل المستودعات عند فتح الصفحة
window.onload = loadRepos;
