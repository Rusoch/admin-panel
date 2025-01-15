import { useSession, getSession, signOut } from "next-auth/react";


const ProtectedPage = () => {
	const { data: session } = useSession();
	const handleSignOut = () => {
		signOut({ callbackUrl: "/login" });
	};

	if (!session) {
		return <p>Access Denied</p>;
	}

	return (
		<div>
			<h1>Protected Page</h1>
			<p>Welcome, {session.user?.name}</p>
			<button onClick={handleSignOut}>sign out</button>
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
};

export default ProtectedPage;
