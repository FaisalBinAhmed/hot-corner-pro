import type { Action } from "./types";

const availableActions: Action[] = [
	"none",
	"scrollToTop",
	"scrollToBottom",
	"reload",
	"back",
	"forward",
	"duplicateTab",
	"toggleBlur",
	"toggleGreyScale",
];

const actionNameMap: Record<Action, string> = {
	none: "None",
	scrollToTop: "Scroll to Top",
	scrollToBottom: "Scroll to Bottom",
	reload: "Reload Page",
	back: "Go Back",
	forward: "Go Forward",
	duplicateTab: "Duplicate Tab",
	toggleBlur: "Toggle Blur",
	toggleGreyScale: "Toggle Greyscale",
};

type CornerSelectProps = {
	value: Action;
	onChange: (value: string) => void;
};

export const CornerSelect = ({ value, onChange }: CornerSelectProps) => (
	<select
		className="p-1 text-sm border border-gray-700 rounded bg-black text-white"
		value={value}
		onChange={(e) => onChange(e.currentTarget.value)}
	>
		{availableActions.map((action) => (
			<option key={action} value={action} className="bg-black text-white">
				{actionNameMap[action]}
			</option>
		))}
	</select>
);
