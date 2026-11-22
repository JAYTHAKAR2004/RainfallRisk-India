import json

with open("project.ipynb", "r", encoding="utf-8") as f:
    nb1 = json.load(f)

for idx, cell in enumerate(nb1["cells"]):
    src = "".join(cell.get("source", []))
    if any(k in src for k in ["Wet_Days", "Rainy_Days", "PRCPTOT", "SDII", "CDD", "CWD", "1.0", "2.5", "wet-day"]):
        print(f"=== CELL {idx} ({cell.get('cell_type')}) ===")
        for line in src.split("\n"):
            if any(term in line for term in ["Wet_Days", "Rainy_Days", "PRCPTOT", "SDII", "threshold", "cdd", "cwd", ">="]):
                print("  ", line.strip())
