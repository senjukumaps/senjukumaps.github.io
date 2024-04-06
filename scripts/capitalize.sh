#!/bin/bash

# Iterate over each .png file in the current directory
for file in *.png; do
    # Check if the file exists
    if [ -e "$file" ]; then
        # Get the base filename
        filename=$(basename "$file")
        # Get the directory path
        directory=$(dirname "$file")
        # Get the first letter of the filename and capitalize it
        first_letter=$(echo "${filename:0:1}" | tr '[:lower:]' '[:upper:]')
        # Get the rest of the filename
        rest=$(echo "${filename:1}")
        # Concatenate the capitalized first letter with the rest of the filename
        new_filename="${first_letter}${rest}"
        # Rename the file with the capitalized filename
        mv "$directory/$filename" "$directory/$new_filename"
        echo "Renamed '$filename' to '$new_filename'"
    else
        echo "No .png files found in the current directory."
        exit 1
    fi
done
