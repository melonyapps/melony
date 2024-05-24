import Link from "next/link";

function NotFound() {
	return (
		<section className="flex h-[calc(100vh-7rem)] justify-center items-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold">404 Not Found</h1>
				<p className="text-slate-400">Page not found :(</p>
				<Link href="/" className="text-slate-400">
					Go to Index page
				</Link>
			</div>
		</section>
	);
}

export default NotFound;
