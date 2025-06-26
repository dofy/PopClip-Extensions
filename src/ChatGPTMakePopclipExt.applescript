-- #popclip
-- name: ChatGPT generate PopClip Snippets
-- icon: square filled CPC
-- requirements: [text]
-- language: applescript
tell application id "com.openai.chat"
  activate
end tell
delay 0.3

set promptText to "## Objective" & ¬
          "\nGenerate a PopClip Snippet plugin based on the requirements below. Output only the installable YAML code without any explanations or additional formatting." & ¬
          "\n" & ¬
          "\n## Output Requirements" & ¬
          "\n1. **YAML code only**: No explanations, comments, or code block formatting" & ¬
          "\n2. **Must start with #popclip**: This is the recognition identifier" & ¬
          "\n3. **Ready to install**: The output code should be directly copy-pastable for installation" & ¬
          "\n4. **Use standard ASCII characters**: Use proper English half-width symbols, avoid special quotes and ellipsis" & ¬
          "\n5. **Wrap in code blocks**: Always enclose the YAML output in ``` code block markers" & ¬
          "\n" & ¬
          "\n## YAML Format Standards" & ¬
          "\n- Use 2 spaces for indentation (no tabs)" & ¬
          "\n- Quote strings with special characters" & ¬
          "\n- Array elements start with hyphen (-)" & ¬
          "\n- Field names in lowercase, use underscores for multi-word fields" & ¬
          "\n- For multi-line JavaScript scripts, use proper YAML literal block format:" & ¬
          "\n  ```yaml" & ¬
          "\n  javascript: |" & ¬
          "\n    {code with proper indentation}" & ¬
          "\n  ```" & ¬
          "\n" & ¬
          "\n## Supported Script Types" & ¬
          "\n**JavaScript:**" & ¬
          "\n```yaml" & ¬
          "\n#popclip" & ¬
          "\nname: Example JS" & ¬
          "\njavascript: popclip.pasteText('Hello ' + popclip.input.text)" & ¬
          "\n```" & ¬
          "\n" & ¬
          "\n**Shell Script:**" & ¬
          "\n```yaml" & ¬
          "\n#popclip" & ¬
          "\nname: Example Shell" & ¬
          "\ninterpreter: zsh" & ¬
          "\nshell script: echo \"Hello $POPCLIP_TEXT\"" & ¬
          "\n```" & ¬
          "\n" & ¬
          "\n**AppleScript:**" & ¬
          "\n```yaml" & ¬
          "\n#popclip" & ¬
          "\nname: Example AppleScript" & ¬
          "\nlanguage: applescript" & ¬
          "\ntell application \"System Events\"" & ¬
          "\n  display dialog popclip text" & ¬
          "\nend tell" & ¬
          "\n```" & ¬
          "\n" & ¬
          "\n**Multiple Actions Example:**" & ¬
          "\n```yaml" & ¬
          "\n#popclip" & ¬
          "\nname: Text Formatting" & ¬
          "\nrequirements: [text, paste]" & ¬
          "\nactions:" & ¬
          "\n- title: Bold" & ¬
          "\n  icon: circle filled B" & ¬
          "\n  javascript: popclip.pasteText('**' + popclip.input.text + '**')" & ¬
          "\n- title: Italic" & ¬
          "\n  icon: circle filled I" & ¬
          "\n  javascript: popclip.pasteText('*' + popclip.input.text + '*')" & ¬
          "\n```" & ¬
          "\n" & ¬
          "\n## Common Fields" & ¬
          "\n- **name**: Plugin name (required)" & ¬
          "\n- **icon**: Icon (e.g., T, circle T, square filled T, symbol:star)" & ¬
          "\n- **requirements**: Dependencies (e.g., [text], [text, paste])" & ¬
          "\n- **actions**: List of actions, each with title, icon, and script" & ¬
          "\n- **url**: URL action (e.g., https://example.com/search?q=***)" & ¬
          "\n" & ¬
          "\n## Script Variables" & ¬
          "\n- **JavaScript**: popclip.input.text" & ¬
          "\n- **Shell**: $POPCLIP_TEXT" & ¬
          "\n- **AppleScript**: popclip text" & ¬
          "\n" & ¬
          "\n## User Request" & ¬
          "\n" & "{popclip text}"

set the clipboard to promptText
delay 0.3

tell application "System Events"
  keystroke "n" using {command down, shift down}
  delay 0.3
  keystroke "v" using {command down} 
  delay 0.3
  key code 36 -- Enter key
end tell