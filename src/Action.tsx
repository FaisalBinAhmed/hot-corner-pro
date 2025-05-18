import { render } from "preact";
import { Shortcuts } from "./Shortcuts";

const ActionPage = () => {
	return <Shortcuts />;
};

render(<ActionPage />, document.getElementById("action")!);
