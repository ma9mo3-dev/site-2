// تأكيد وجود مستخدم مسجل
const currentUser = localStorage.getItem('current_user');
if (!currentUser) {
  window.location.href = 'index.html';
}

// قلب المستودع (إعجاب / إزالة إعجاب)
function toggleLike(repoName, author) {
  const likesKey = `likes_${repoName}_${author}`;
  let likes = JSON.parse(localStorage.getItem(likesKey)) || 0;

  // تحقق إذا المستخدم سبق وعمل لايك
  const userLikesKey = `user_likes_${currentUser}_${repoName}_${author}`;
  const userLiked = localStorage.getItem(userLikesKey);

  if (userLiked) {
    likes -= 1;
    localStorage.removeItem(userLikesKey);
  } else {
    likes += 1;
    localStorage.setItem(userLikesKey, true);
  }

  localStorage.setItem(likesKey, JSON.stringify(likes));
  loadRepos(); // إعادة تحميل المستودعات لتحديث الأعداد
}

// فتح نافذة التعليقات
function openComments(repoName, author) {
  const commentsKey = `comments_${repoName}_${author}`;
  let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

  let commentText = prompt(
    `التعليقات على "${repoName}" من ${author}:\n` +
    comments.map(c => `- ${c.user}: ${c.text}`).join('\n') +
    '\n\nأضف تعليق جديد:'
  );

  if (commentText && commentText.trim() !== '') {
    comments.push({ user: currentUser, text: commentText.trim() });
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }

  loadRepos(); // إعادة تحميل المستودعات لتحديث عدد التعليقات
}

// تسجيل الخروج من الموقع
function logout() {
  localStorage.removeItem('current_user');
  window.location.href = 'index.html';
}

// تفعيل شريط القائمة الجانبي
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}
