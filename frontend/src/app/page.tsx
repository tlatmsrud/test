import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-brand-700">TestSite Todo</h1>
      <p className="text-slate-600">프로젝트별로 할 일을 관리하세요.</p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="rounded-input bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="rounded-input border border-brand-600 px-4 py-2 text-brand-700 hover:bg-brand-50"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
