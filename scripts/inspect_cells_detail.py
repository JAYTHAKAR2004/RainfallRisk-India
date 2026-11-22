import json

with open("project.ipynb", "r", encoding="utf-8") as f:
    nb1 = json.load(f)

for idx in [44, 45, 46, 47, 48, 49]:
    cell = nb1["cells"][idx]
    src = "".join(cell.get("source", []))
    print(f"================ CELL {idx} ================")
    print(src[:800])
