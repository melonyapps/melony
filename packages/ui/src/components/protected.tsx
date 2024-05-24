import { useAuth } from "./providers/auth-provider";
import { SmartAuth } from "./smart/smart-auth";

export function Protected({
	children,
}: {
	children: JSX.Element | React.ReactNode;
}) {
	const { user } = useAuth();

	if (!user) return <SmartAuth />;

	return children;
}
