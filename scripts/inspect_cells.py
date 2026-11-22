import json

with open("project.ipynb", "r", encoding="utf-8") as f:
    nb1 = json.load(f)

for idx in range(35, len(nb1["cells"])):
    cell = nb1["cells"][idx]
    src = "".join(cell.get("source", []))
    lines = [l.strip() for l in src.split("\n") if l.strip()]
    first_line = lines[0] if lines else "EMPTY"
    ctype = cell.get("cell_type")
    print(f"Cell {idx} ({ctype}): {first_line[:80]}")
