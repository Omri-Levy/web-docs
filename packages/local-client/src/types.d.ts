type ResizeDirection = `vertical` | `horizontal`;
type MoveCellDirection = `up` | `down`;
type CellType = `code` | `text`;

interface Cell {
	id: string;
	type: CellType;
	content: string;
}

export {ResizeDirection, MoveCellDirection, CellType, Cell};
