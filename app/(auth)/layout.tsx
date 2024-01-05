import Logo from '@/components/logo';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <div className="mb-12">
        <Logo className="h-8 w-32" />
      </div>
      {children}
    </div>
  );
}
