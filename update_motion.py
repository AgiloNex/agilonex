import os
import glob
import re

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content

    # Check if framer-motion is used and opacity: 0 is used
    if 'framer-motion' in content and 'opacity: 0' in content:
        # Import useReducedMotion if not present
        if 'useReducedMotion' not in content:
            content = re.sub(
                r'import\s+\{([^}]+)\}\s+from\s+["\']framer-motion["\'];?',
                r'import {\1, useReducedMotion } from "framer-motion";',
                content
            )

        # Inject hook call if not present
        if 'const shouldReduceMotion = useReducedMotion();' not in content:
            # Find the component declaration and inject it
            # Matches: const Comp = () => { OR export function Comp() {
            content = re.sub(
                r'((?:const\s+\w+\s*=\s*(?:\([^)]*\))?\s*=>\s*\{)|(?:(?:export\s+)?(?:default\s+)?function\s+\w+\s*\([^)]*\)\s*\{))',
                r'\1\n  const shouldReduceMotion = useReducedMotion();\n',
                content
            )

        # Replace opacity: 0 in initial with shouldReduceMotion check
        content = re.sub(r'initial=\{\{([^}]*)opacity:\s*0([^}]*)\}\}', r'initial={{\1opacity: shouldReduceMotion ? 1 : 0\2}}', content)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for file in glob.glob('src/components/**/*.tsx', recursive=True):
    update_file(file)

print("done")
