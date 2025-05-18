import { render } from "preact";
import { Shortcuts } from "./Shortcuts";

const ActionPage = () => {
	return (
		<div className="w-[400px] p-2 bg-black text-white">
			<Shortcuts />
		</div>
	);
};

render(<ActionPage />, document.getElementById("action")!);
