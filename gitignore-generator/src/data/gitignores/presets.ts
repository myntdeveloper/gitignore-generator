import type { LanguagePreset } from "../../types/preset";
import pythonTemplate from "./python.gitignore?raw";
import golangTemplate from "./golang.gitignore?raw";
import javascriptTemplate from "./javascript.gitignore?raw";
import typescriptTemplate from "./typescript.gitignore?raw";
import reactTemplate from "./react.gitignore?raw";
import rustTemplate from "./rust.gitignore?raw";
import kotlinTemplate from "./kotlin.gitignore?raw";
import javaTemplate from "./java.gitignore?raw";
import csharpTemplate from "./csharp.gitignore?raw";
import phpTemplate from "./php.gitignore?raw";
import rubyTemplate from "./ruby.gitignore?raw";
import swiftTemplate from "./swift.gitignore?raw";
import dockerTemplate from "./docker.gitignore?raw";
import nodeTemplate from "./node.gitignore?raw";
import macosTemplate from "./macos.gitignore?raw";
import windowsTemplate from "./windows.gitignore?raw";
import linuxTemplate from "./linux.gitignore?raw";
import dartTemplate from "./dart.gitignore?raw";
import flutterTemplate from "./flutter.gitignore?raw";

export const languagePresets: LanguagePreset[] = [
  { id: "python", label: "Python", color: "#3776AB", description: "Python caches, venv, tests, builds.", template: pythonTemplate },
  { id: "golang", label: "Golang", color: "#00ADD8", description: "Go binaries, tests, workspace files.", template: golangTemplate },
  { id: "javascript", label: "JavaScript", color: "#F7DF1E", description: "Node modules, logs, cache, dist.", template: javascriptTemplate },
  { id: "typescript", label: "TypeScript", color: "#3178C6", description: "TS build info and compiled outputs.", template: typescriptTemplate },
  { id: "react", label: "React", color: "#61DAFB", description: "React build outputs and local env files.", template: reactTemplate },
  { id: "rust", label: "Rust", color: "#DEA584", description: "Cargo target and local rust artifacts.", template: rustTemplate },
  { id: "kotlin", label: "Kotlin", color: "#7F52FF", description: "Gradle outputs and IntelliJ metadata.", template: kotlinTemplate },
  { id: "java", label: "Java", color: "#F89820", description: "Java classes, jars, and build folders.", template: javaTemplate },
  { id: "csharp", label: "C#", color: "#512BD4", description: "Visual Studio and .NET build artifacts.", template: csharpTemplate },
  { id: "php", label: "PHP", color: "#777BB4", description: "Composer and framework runtime files.", template: phpTemplate },
  { id: "ruby", label: "Ruby", color: "#CC342D", description: "Bundle, logs, tmp and package outputs.", template: rubyTemplate },
  { id: "swift", label: "Swift", color: "#FA7343", description: "Xcode and SwiftPM generated files.", template: swiftTemplate },
  { id: "dart", label: "Dart", color: "#0175C2", description: "Dart tool/build/pub generated files.", template: dartTemplate },
  { id: "flutter", label: "Flutter", color: "#02569B", description: "Flutter build and platform artifacts.", template: flutterTemplate },
  { id: "node", label: "Node", color: "#5FA04E", description: "Node runtime, package and build files.", template: nodeTemplate },
  { id: "docker", label: "Docker", color: "#2496ED", description: "Docker local env and archive files.", template: dockerTemplate },
  { id: "macos", label: "macOS", color: "#7D7D7D", description: "macOS system and Finder artifacts.", template: macosTemplate },
  { id: "windows", label: "Windows", color: "#00A4EF", description: "Windows system metadata files.", template: windowsTemplate },
  { id: "linux", label: "Linux", color: "#FCC624", description: "Linux temp and editor backup files.", template: linuxTemplate },
];
