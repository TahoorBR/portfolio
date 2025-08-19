import os

SKIP_DIRS = {"venv", ".venv", ".git", "__pycache__", "node_modules", ".next"}

def print_tree(root_path: str, prefix: str = "", output_file: str = None):
    """
    Prints a tree-like directory structure starting from root_path.
    Skips directories in SKIP_DIRS.
    """
    lines = []

    # Include the root itself
    if prefix == "":
        lines.append(root_path)

    try:
        entries = [e for e in os.listdir(root_path) if e not in SKIP_DIRS]
    except PermissionError:
        return lines  # Skip directories we can't access
    entries.sort()

    for index, entry in enumerate(entries):
        path = os.path.join(root_path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        lines.append(f"{prefix}{connector}{entry}")

        if os.path.isdir(path):
            extension = "    " if index == len(entries) - 1 else "│   "
            lines.extend(print_tree(path, prefix + extension))

    # Print and/or save only at the top level
    if prefix == "":
        tree_output = "\n".join(lines)
        print(tree_output)
        if output_file:
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(tree_output)
    return lines

# Example usage:
print_tree(".")  # prints the structure of the current directory
