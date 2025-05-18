import { useState, useEffect } from "preact/hooks";
import type { CornerActions } from "./types";
import { CornerSelect } from "./CornerSelect";

export const Shortcuts = () => {
	const [cornerActions, setCornerActions] = useState<CornerActions>({
		topLeft: "none",
		topRight: "none",
		bottomLeft: "none",
		bottomRight: "none",
	});

	const [cornerZoneSize, setCornerZoneSize] = useState(20); // 20% of the viewport from each corner

	useEffect(() => {
		chrome.storage.sync.get(["cornerActions", "cornerZoneSize"], (result) => {
			if (result.cornerActions) {
				setCornerActions(result.cornerActions);
			}
			if (typeof result.cornerZoneSize === "number") {
				setCornerZoneSize(result.cornerZoneSize);
			}
		});
	}, []);

	const updateCorner = (corner: keyof typeof cornerActions, action: string) => {
		const updated = { ...cornerActions, [corner]: action };
		setCornerActions(updated);
		chrome.storage.sync.set({ cornerActions: updated });
	};

	const handleZoneSizeChange = (e: Event) => {
		const newSize = Number.parseInt((e.target as HTMLSelectElement).value);
		setCornerZoneSize(newSize);
		chrome.storage.sync.set({ cornerZoneSize: newSize });
	};

	return (
		<div className="w-full p-2 flex flex-col items-center">
			<h1 className="text-lg font-bold mb-2">Hot Corner Shortcuts</h1>
			<p className="text-sm text-gray-300 mb-4">
				Assign an action to each screen corner:
			</p>

			<div className="relative w-96 h-72 m-2">
				<div
					className={
						"absolute top-0 left-0 bg-green-500/30 rounded-tl-md pointer-events-none"
					}
					style={{ width: `${cornerZoneSize}%`, height: `${cornerZoneSize}%` }}
				/>
				<div
					className={
						"absolute top-0 right-0 bg-green-500/30 rounded-tr-md pointer-events-none"
					}
					style={{ width: `${cornerZoneSize}%`, height: `${cornerZoneSize}%` }}
				/>
				<div
					className={
						"absolute bottom-0 left-0 bg-green-500/30 rounded-bl-md pointer-events-none"
					}
					style={{ width: `${cornerZoneSize}%`, height: `${cornerZoneSize}%` }}
				/>
				<div
					className={
						"absolute bottom-0 right-0 bg-green-500/30 rounded-br-md pointer-events-none"
					}
					style={{ width: `${cornerZoneSize}%`, height: `${cornerZoneSize}%` }}
				/>

				<div className="grid grid-cols-3 grid-rows-3 w-full h-full rounded-md bg-zinc-800 text-center">
					<div className="flex items-start justify-start p-2">
						<CornerSelect
							value={cornerActions.topLeft}
							onChange={(value) => updateCorner("topLeft", value)}
						/>
					</div>
					<div />
					<div className="flex items-start justify-end p-2">
						<CornerSelect
							value={cornerActions.topRight}
							onChange={(value) => updateCorner("topRight", value)}
						/>
					</div>

					<div />
					<div className="flex items-center justify-center text-xs text-gray-500">
						Current Page
					</div>
					<div />

					<div className="flex items-end justify-start p-2">
						<CornerSelect
							value={cornerActions.bottomLeft}
							onChange={(value) => updateCorner("bottomLeft", value)}
						/>
					</div>
					<div />
					<div className="flex items-end justify-end p-2">
						<CornerSelect
							value={cornerActions.bottomRight}
							onChange={(value) => updateCorner("bottomRight", value)}
						/>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between w-full mt-2">
				<p className="text-sm text-gray-300">Active double-click zone size:</p>
				<select
					value={cornerZoneSize}
					onChange={handleZoneSizeChange}
					className="border border-gray-700 rounded text-sm px-2 py-1"
				>
					{[10, 15, 20, 25, 30, 35, 40].map((v) => (
						<option key={v} value={v}>
							{v}%
						</option>
					))}
				</select>
			</div>
			<p className="text-xs text-gray-500 mt-2">
				Note: You have to refresh existing pages for the changes to take effect.
			</p>
		</div>
	);
};
