import { useState, useEffect } from "preact/hooks";
import type { Action, CornerActions } from "./types";

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

export const Shortcuts = () => {
	const [cornerActions, setCornerActions] = useState<CornerActions>({
		topLeft: "none",
		topRight: "none",
		bottomLeft: "none",
		bottomRight: "none",
	});

	useEffect(() => {
		chrome.storage.sync.get(["cornerActions"], (result) => {
			if (result.cornerActions) {
				setCornerActions(result.cornerActions);
			}
		});
	}, []);

	const updateCorner = (corner: keyof typeof cornerActions, action: string) => {
		const updated = { ...cornerActions, [corner]: action };
		setCornerActions(updated);
		chrome.storage.sync.set({ cornerActions: updated });
	};

	return (
		<div className="w-full p-4 flex flex-col items-center justify-center">
			<h1 className="text-lg font-bold mb-2">Hot Corners</h1>
			<p className="text-sm text-gray-600 mb-4">
				Assign an action to each screen corner:
			</p>

			<div className="grid grid-cols-3 grid-rows-3 w-72 h-72 m-2 border rounded-md bg-gray-100 text-center">
				<div className="flex items-start justify-start p-2">
					<select
						className="p-1 text-sm border rounded"
						value={cornerActions.topLeft}
						onChange={(e) => updateCorner("topLeft", e.currentTarget.value)}
					>
						{availableActions.map((action) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</select>
				</div>

				<div />

				<div className="flex items-start justify-end p-2">
					<select
						className="p-1 text-sm border rounded"
						value={cornerActions.topRight}
						onChange={(e) => updateCorner("topRight", e.currentTarget.value)}
					>
						{availableActions.map((action) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</select>
				</div>
				<div />

				<div className="flex items-center justify-center text-xs text-gray-500">
					Your Page
				</div>
				<div />

				<div className="flex items-end justify-start p-2">
					<select
						className="p-1 text-sm border rounded"
						value={cornerActions.bottomLeft}
						onChange={(e) => updateCorner("bottomLeft", e.currentTarget.value)}
					>
						{availableActions.map((action) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</select>
				</div>
				<div />
				<div className="flex items-end justify-end p-2">
					<select
						className="p-1 text-sm border rounded"
						value={cornerActions.bottomRight}
						onChange={(e) => updateCorner("bottomRight", e.currentTarget.value)}
					>
						{availableActions.map((action) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};
