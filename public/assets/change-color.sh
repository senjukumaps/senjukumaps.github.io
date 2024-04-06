#!/bin/bash

# Define the colors to replace
FROM_COLOR="#fff"
TO_COLOR="#000"

# Loop through all SVG files in the current directory
for file in *.svg; do
  # Check if the file exists to avoid errors in case there are no SVG files
  if [ -f "$file" ]; then
    # Use sed to replace the from color with the to color in-place
    sed -i '' "s/fill=\"$FROM_COLOR\"/fill=\"$TO_COLOR\"/g" "$file"
    echo "Processed $file"
  fi
done