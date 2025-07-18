# [1.33.0](https://github.com/likec4/likec4/compare/v1.32.2...v1.33.0) (2025-06-25)

### 🚀 Features

* **Markdown**
  
  Strings with triple qoutes (`""" markdown """` or `''' markdown '''`) are now parsed as Markdown.  
  This is the first step in adopting Markdown support, and it’s currently limited to descriptions only:

  ```zig
  model {
    mobile = application {
      description '''
        ### Multi-platform application
  
        [React Native](https://reactnative.dev)
      '''
    }
  
    web = application {
      description """
        ### Web Application
  
        > Provides services to customers through
        > the web interface.
  
        | checks     |     |
        | :--------- | :-- |
        | check 1    | ✅  |
        | check 2    | ⛔️  |
        | check 3    | ✅  |
      """
    }
  }
  ```
  Closes [#1124](https://github.com/likec4/likec4/issues/1124)

### Bug Fixes

* **dsl:** resilient parser for specification tags ([ba9619b](https://github.com/likec4/likec4/commit/ba9619b9d1b5bd996c5fbe136890f9b1cbf579aa))
* **api:** inherit deployed instances titles from model ([5cc6ac5](https://github.com/likec4/likec4/commit/5cc6ac5d7db1bdad1fc235100eef49c0841cb53d))
* **layout:** round font size values to prevent decimal pixel sizes in graphviz labels ([199c024](https://github.com/likec4/likec4/commit/199c024dd83b70c8ba2d36071b0a32d58a52d3ab))


## [1.32.2](https://github.com/likec4/likec4/compare/v1.32.1...v1.32.2) (2025-06-16)

### Bug Fixes

* memory leak on MCP server restarts ([0b01bb4](https://github.com/likec4/likec4/commit/0b01bb434944cc0a73c5ffd7c8f60f97544e67bc))
* relationship descriptions not displayed in tooltip, closes [#1981](https://github.com/likec4/likec4/issues/1981)

### Improvements

* show error message if  MCP server fails to start
* validate project name ([#2008](https://github.com/likec4/likec4/issues/2008))
* improve error logging in vscode extension (to help with [#1716](https://github.com/likec4/likec4/issues/1716))

## [1.32.1](https://github.com/likec4/likec4/compare/v1.32.0...v1.32.1) (2025-06-12)


### Bug Fixes

* impossible to open elements in navigation menu since 1.32.0, closes [#1996](https://github.com/likec4/likec4/issues/1996)


### Improvements

* **dsl:** support rgb and rgba colors
  ```zig
  specification {
    tag deprecated {
      color rgba(44, 8, 128, 0.9)
    }
  }
  ```
  
* **dsl:** support escaped quotes in string literals
  ```zig
  specification {
    service cloud 'Cloud\'s Systems' 
    service cloud "Cloud\"s Systems"
  }
  ```



# [1.32.0](https://github.com/likec4/likec4/compare/v1.31.0...v1.32.0) (2025-06-10)

### 🚀 Features

* **Tag colors**  
  Now it is possible to assign colors to tags:
  ```zig
  specification {
    tag deprecated {
      color #FF0000
    }
  }
  ```
  Tags are displayed by default (you can disable by `enableElementTags={false}` on React component):  
  <img width="297" alt="SCR-20250610-moth" src="https://github.com/user-attachments/assets/9cab8ac1-1ca5-4881-ab67-0cbf1af6fffc" />

  [📖 Documentation](https://likec4.dev/dsl/specification/#tag)

* **Tags for kinds**  

  ```zig
  specification {
    // Now every kafka-topic will be marked with the infra and data-lake tags
    element kafka-topic {
      #infra #data-lake
    }
    tag infra
    tag data-lake
  }
  ```

* **Export to PlantUML**
  ```sh
  likec4 gen plantuml
  ```
  thanks @pavelpykhtin, closes [#1953](https://github.com/likec4/likec4/issues/1953) 

### Bug Fixes

* **language-server:** resolving dependency issue, thanks @mattwahl ([#1989](https://github.com/likec4/likec4/issues/1989)) ([8804808](https://github.com/likec4/likec4/commit/8804808fd8d2cade94c138750494c88207c205ba))
* **lsp:** Fixed lsp renaming for tags and relation kinds, thanks @pavelpykhtin [#1819](https://github.com/likec4/likec4/issues/1819) ([#1988](https://github.com/likec4/likec4/issues/1988)) ([7fa1e06](https://github.com/likec4/likec4/commit/7fa1e063fed7e71a5bd2c15c3a8a37fbc38c549a))
* **vscode:** VS Code plugin shows `[object Object]` for instanceOf target in hover tooltip ([#1955](https://github.com/likec4/likec4/issues/1955)) ([0334a7d](https://github.com/likec4/likec4/commit/0334a7dcfca122c0806db7d4585e754f4f0a08d1)), closes [#1948](https://github.com/likec4/likec4/issues/1948)

### Improvements

Refactored `@likec4/core`, providing type-safe models.  
[📖 Documentation](https://github.com/likec4/likec4/blob/main/packages/core/README.md)

# [1.31.0](https://github.com/likec4/likec4/compare/v1.30.0...v1.31.0) (2025-05-25)

### 🚀 Features

* **Custom renderers**  
  More customization coming, you can control how elements are rendered, add your action buttons or extra details:
  ```tsx
  import { LikeC4Diagram } from '@likec4/diagram'
  import {
    ElementActions,
    ElementDetailsButtonWithHandler,
    elementNode,
    ElementNodeContainer,
    ElementShape,
    ElementTitle,
    ElementToolbar,
    IfNotReadOnly,
  } from '@likec4/diagram/custom'
  import { IconPlus } from '@tabler/icons-react'
  
  const customNodes = {
    element: elementNode(({ nodeProps, nodeModel }) => (
      <ElementNodeContainer nodeProps={nodeProps}>
        <ElementShape {...nodeProps} />
        <ElementTitle {...nodeProps} />
        {/* Add extra buttons */}
        <ElementActions
          {...nodeProps}
          extraButtons={[
            {
              key: 'plus',
              icon: <IconPlus />,
              onClick: () => console.log('extra'),
            },
          ]}
        />
        {/* Add extra info */}
        <div style={{ position: 'absolute', bottom: 0 }}>
          {nodeModel.element.getMetadata('your-attr')}
        </div>
      </ElementNodeContainer>
    )),
  }
  
  function App() {
    return (
      <LikeC4Diagram
        view={view}
        renderNodes={customNodes}
      />
    )
  }
  ```
  [📖 Documentation](https://likec4.dev/tooling/react/)
    
* **Quotes Formatting**  
  VSCode extension allows to configure preferred quote style.  
  (thanks @pavelpykhtin, closes [#1772](https://github.com/likec4/likec4/issues/1772))


# [1.30.0](https://github.com/likec4/likec4/compare/v1.29.1...v1.30.0) (2025-04-27)

### 🚀 Features

* **Local icons**  
  ```zig
  model {
    pg = service 'PostgreSQL' {
      style {
        // local image, relative to current file
        icon ../postgresql.svg
      }
    }
  }
  ```
  Thanks, @kieronlanning, for the long-awaited feature, closes [#1439](https://github.com/likec4/likec4/issues/1439)


### Bug Fixes

* **cli:** export png fails due to chromiumSandbox ([20d7a49](https://github.com/likec4/likec4/commit/20d7a499368947da5a536c44d47b3c521cbd63f5)), closes [#1885](https://github.com/likec4/likec4/issues/1885)
* extra padding to fix PNG export cropping issue ([ac14d1b](https://github.com/likec4/likec4/commit/ac14d1bb6d1a3316c45905937ca117edcfbd4daa)), closes [#1857](https://github.com/likec4/likec4/issues/1857)


## [1.29.1](https://github.com/likec4/likec4/compare/v1.29.0...v1.29.1) (2025-04-25)

### Improvements
* dynamic document title, closes [#1875](https://github.com/likec4/likec4/issues/1875)

### Bug Fixes

* **dsl:** 'none' icon value does not have any effect ([ef6d33e](https://github.com/likec4/likec4/commit/ef6d33e65de3bdacb59563036432482190071804))
* **cli:** build multi-projects ([3554f59](https://github.com/likec4/likec4/commit/3554f590fb5c7591d18f3987f18f73871032b19e))
* **cli:** export multi-projects ([ccb2347](https://github.com/likec4/likec4/commit/ccb2347c17131cbbc1b34eb3889f716f2a404efd))

# [1.29.0](https://github.com/likec4/likec4/compare/v1.28.1...v1.29.0) (2025-04-16)

### 🚀 Features

* **MCP Server**  
  [📖 Documentation](https://likec4.dev/tools/mcp/)
  
* Filter option to `export` command for selective view export by ID  
  ```sh
  likec4 export png --filter="team1*" --filter="index" .
  ```

### Bug Fixes

* **diagram:** use Context.Provider instead of bare Context for react 18 compatibility, closes [#1858](https://github.com/likec4/likec4/issues/1858)
* **lsp:** dont log to stdout, as it breaks LSP usage with `--stdio`


## [1.28.1](https://github.com/likec4/likec4/compare/v1.28.0...v1.28.1) (2025-04-11)

### Bug Fixes

* **export:** relationships not rendered correctly when exporting to PNG, closes [#1707](https://github.com/likec4/likec4/issues/1707)
* **diagram:** strange glitches on mouse hover in search view, closes [#1798](https://github.com/likec4/likec4/issues/1798)
* **vscode:** apply style changes in deployment views
* **react:** mark `react` as peerDependency with relaxed semver range (compatible with react 18 and 19)


# [1.28.0](https://github.com/likec4/likec4/compare/v1.27.3...v1.28.0) (2025-04-09)

This release improves multi-projects support

### 🚀 Features

* **imports**  
  Reference elements from other projects
  
  ```zig
  import { serviceA } from 'projectA'
  
  model {
    serviceB = service {
      -> serviceA.api 'calls serviceA'
    }
  }
  ```

* **excludes**  
  Exclude files in the config file
  
  ```json
  {
    "name": "project-name",
    "exclude": [
      "**/node_modules/**/*"
    ]
  }
  ```

[📖 Read the documentation](https://likec4.dev/dsl/projects/)  


## [1.27.3](https://github.com/likec4/likec4/compare/v1.27.2...v1.27.3) (2025-04-02)


### Bug Fixes

* regression: buttons on elements do not work anymore when clicked, closes [#1797](https://github.com/likec4/likec4/issues/1797)


### Improvements

* build embed url with respect to the current history mode, thanks @pavelpykhtin, closes [#1678](https://github.com/likec4/likec4/issues/1678) ([#1795](https://github.com/likec4/likec4/issues/1795))



## [1.27.2](https://github.com/likec4/likec4/compare/v1.27.1...v1.27.2) (2025-04-01)


### Bug Fixes

* hovering notation did not highlight elements anymore, closes [#1681](https://github.com/likec4/likec4/issues/1681)
* color style definition not respected in 1.27.1, closes [#1785](https://github.com/likec4/likec4/issues/1785)


### Improvements

* Navigate to relationship details from RelationshipsBrowser


## [1.27.1](https://github.com/likec4/likec4/compare/v1.27.0...v1.27.1) (2025-03-28)

### Bug Fixes

* react component links error ([#1771](https://github.com/likec4/likec4/issues/1771)), closes [#1728](https://github.com/likec4/likec4/issues/1728)
* relationships not rendered correctly when exporting to PNG ([477cf99](https://github.com/likec4/likec4/commit/477cf992783c99d906ed182d7a3f6a6e88b12907))
* layout editor fails on edge changes ([949fd4c](https://github.com/likec4/likec4/commit/949fd4cd8904cf25f3e11e8cf49f2ef7ec9d151a))


# [1.27.0](https://github.com/likec4/likec4/compare/v1.26.2...v1.27.0) (2025-03-27)

### Features

* Global/View scopes in relationships browser ([#1769](https://github.com/likec4/likec4/issues/1769), closes [#1583](https://github.com/likec4/likec4/issues/1583) [#1732](https://github.com/likec4/likec4/issues/1732))
  ![image](https://github.com/user-attachments/assets/c5595c1f-8087-4375-a0b3-93f2a0a4c498)


* multi-projects in vite plugin ([#1749](https://github.com/likec4/likec4/issues/1749))
  ```jsx
  // where `project-a` and `project-b` are the names of your projects
  import { LikeC4View as ProjectA_LikeC4View } from 'likec4:react/project-a'
  import { LikeC4View as ProjectB_LikeC4View } from 'likec4:react/project-b'
  
  const example = () => (
    <>
      <ProjectA_LikeC4View viewId='index' />
      <ProjectB_LikeC4View viewId='index' />
    </>
  )
  ```


* Styled-system based on [pandacss](https://panda-css.com/) ([#1726](https://github.com/likec4/likec4/issues/1726))  
  Step closer to Diagram customizations, documentation comes soon
  

### Bug Fixes

* typo and link, thanks @husa [#1765](https://github.com/likec4/likec4/issues/1765)


## [1.26.2](https://github.com/likec4/likec4/compare/v1.26.1...v1.26.2) (2025-03-17)

### Bug Fixes

* empty sidebar, closes [#1715](https://github.com/likec4/likec4/issues/1715)
* extending a view does not inherit title or description, closes [#1719](https://github.com/likec4/likec4/issues/1719)
* unexpected arrow style derived from model to dynamic view, closes [#1723](https://github.com/likec4/likec4/issues/1723)


## [1.26.1](https://github.com/likec4/likec4/compare/v1.26.0...v1.26.1) (2025-03-11)

### Hot Fix

* **app:** wrong `LikeC4ModelProvider` in generated app ([d09c709](https://github.com/likec4/likec4/commit/d09c7090f09f11adb03815dae3b138499847fb7b))


# [1.26.0](https://github.com/likec4/likec4/compare/v1.25.1...v1.26.0) (2025-03-11)

This release marks a **huge first step** in simplifying LikeC4 integration with any Vite-based application.

### 🚀 Features

* **🔌 Vite Plugin**  
 
  The new Vite plugin allows you to **embed LikeC4 views** directly into your application or documentation website.  
  Configure:
  
  ```ts  
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import { LikeC4VitePlugin } from 'likec4/vite-plugin'

  export default defineConfig({
    plugins: [
      react(),
      LikeC4VitePlugin({}),
    ],
  })
  ```

  Use:
  ```tsx
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { LikeC4View } from 'likec4:react'

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LikeC4View viewId='index' />
    </StrictMode>
  )
  ```

  [📖 Read the documentation](https://likec4.dev/tooling/vite-plugin/)

* **📂 Multi-Project Workspaces**  
  
  This release adds multi-project support in both the CLI and VS Code.
  Simply create a likec4.config.json file in a folder, and it will be recognized as a LikeC4 project.
  
  [📖 Learn more](https://likec4.dev/dsl/projects/)

* **llms.txt support**  
  Thanks to @simonwfarrow for suggesting this in [#1683](https://github.com/likec4/likec4/discussions/1683).
  likec4.dev now provides:
  - [llms.txt](https://likec4.dev/llms.txt)
  - [llms-full.txt](https://likec4.dev/llms-full.txt) 
  
  [Read more about llms.txt](https://llmstxt.org/)


## [1.25.1](https://github.com/likec4/likec4/compare/v1.25.0...v1.25.1) (2025-03-10)

### Improvements

* **diagram:** reduce graphics on panning/zooming only ([fa184a6](https://github.com/likec4/likec4/commit/fa184a666a68f6adf7e3520bea4c0a8522e809d4))


### Bug Fixes

* **lsp:** fixed typo in `likec4-language-server` bin entry



# [1.25.0](https://github.com/likec4/likec4/compare/v1.24.1...v1.25.0) (2025-03-07)

### 🚀 Features

* **Share**  
  You can share your LikeC4 model and diagrams using Playground.  
  This is the first step, and we need your feedback, ideas and [support](https://github.com/sponsors/likec4).
  
  Example:  
  - https://playground.likec4.dev/share/fXFN2k0RiZ/  
    pincode is `1111` 
  
  ![image](https://github.com/user-attachments/assets/6b73633e-a744-49b8-9d1f-965790409b70)

  

* **Performance**  
  In large diagrams, degradation comes from `dashed`-styled connections.  
  This version introduces a temporary "tradeoff", auto-switching to solid lines in large pannable diagrams (controlled by `reduceGraphics` property, if you use React components).  
  We are looking for better solution.

  
### Improvements

* **playground:** xyflow catches and prevents keypress`Space`, that breaks monaco ([26223c3](https://github.com/likec4/likec4/commit/26223c37f8dd318130efe39f50ca736d695e0a0b))
* **vscode:** refactor extension with `reactive-vscode` ([#1668](https://github.com/likec4/likec4/issues/1668)) ([0bb02e7](https://github.com/likec4/likec4/commit/0bb02e769c322f34d5460a94ac4880a662001dbf))


## [1.24.1](https://github.com/likec4/likec4/compare/v1.24.0...v1.24.1) (2025-02-27)


### Improvements

* **cli:** added an alias for ignore-layout option, thanks @pavelpykhtin ([#1648](https://github.com/likec4/likec4/issues/1648))), closes [#1638](https://github.com/likec4/likec4/issues/1638) 
* **cli:** temprorary enable access to any host (check [#1649](https://github.com/likec4/likec4/issues/1649) for details)

### Bug Fixes

* **diagram:** reduce visuals for large diagrams, closes [#1624](https://github.com/likec4/likec4/issues/1624) 


# [1.24.0](https://github.com/likec4/likec4/compare/v1.23.1...v1.24.0) (2025-02-25)

### 🚀 Features

* **`extend` in deployment model**  
  As in the logical model, you can extend deployment nodes:

  ```zig
  // 'deployments/prod.c4'
  deployment {
    environment prod
  }
  
  // 'deployments/prod/zone-eu.c4'
  deployment {
    extend prod {
      zone eu
    }
  }
  ``` 
  [Documentation](https://likec4.dev/dsl/deployment/model/#extend-nodes), closes [#1609](https://github.com/likec4/likec4/issues/1609)

### Bug Fixes

* **diagram:** useless search bar in embedded mode, closes [#1642](https://github.com/likec4/likec4/issues/1642)


## [1.23.1](https://github.com/likec4/likec4/compare/v1.23.0...v1.23.1) (2025-02-23)

### Bug Fixes

* **lsp:** do not resolve real filename for symbolic links, thanks @davydkov ([#1635](https://github.com/likec4/likec4/issues/1635)) ([b8536a6](https://github.com/likec4/likec4/commit/b8536a693bd6cb91ad8380f3453a62293bc7019f)), closes [#1620](https://github.com/likec4/likec4/issues/1620)


# [1.23.0](https://github.com/likec4/likec4/compare/v1.22.1...v1.23.0) (2025-02-21)

### Features

* added `details` button to the 'relationship browser' and 'relationship details' overlays, thanks @pavelpykhtin ([#1622](https://github.com/likec4/likec4/issues/1622)) ([ca78487](https://github.com/likec4/likec4/commit/ca784877c066af3355a063b6b9496a1a6c51fa44)), closes [#1452](https://github.com/likec4/likec4/issues/1452)
* CLI and vscode validation command, thanks @pavelpykhtin ([#1613](https://github.com/likec4/likec4/issues/1613)) ([c4a9740](https://github.com/likec4/likec4/commit/c4a9740412883a21d77d1a59ff035c2114397972)), closes [#1464](https://github.com/likec4/likec4/issues/1464)
* detail dialogs do not change current state ([#1633](https://github.com/likec4/likec4/issues/1633)) ([854fcaf](https://github.com/likec4/likec4/commit/854fcaf129ed33621211cc5f78367a7034ef2d06))


### Bug Fixes

* **diagram:** draggable nodes in locked mode ([5cd7422](https://github.com/likec4/likec4/commit/5cd7422282f0721d014a90a50378b86e5895224b))
* **lsp:** path to bundled language-server ([134f100](https://github.com/likec4/likec4/commit/134f100913149a6aecbd170239cd175d1f33b4a1))
* **diagram:** styles of compound node header in light theme, thanks @pavelpykhtin  ([#1623](https://github.com/likec4/likec4/issues/1623)) ([f4b157a](https://github.com/likec4/likec4/commit/f4b157a1787e2393ce037ac379edfa844fa2361b)), closes [#1590](https://github.com/likec4/likec4/issues/1590)
* **diagram:** temporary disable `onlyRenderVisibleElements` ([7a8f492](https://github.com/likec4/likec4/commit/7a8f49286283df216f54da57579133c0da5b328b))


## [1.22.1](https://github.com/likec4/likec4/compare/v1.22.0...v1.22.1) (2025-02-13)

### Improvement

* **diagram:** manual layout is locked by default ([a847a28](https://github.com/likec4/likec4/commit/a847a2872602db9c3cefbf0f5435e012813d7e60)), closes [#1518](https://github.com/likec4/likec4/issues/1518)

### Bug Fixes

* **cli:** failing check update command ([a6b9544](https://github.com/likec4/likec4/commit/a6b954484534f23b360212b033c21f278abdbc66))
* **export:** manual layout causes the exported landscape view losing nodes and links, when exporting to .png ([5ebbc03](https://github.com/likec4/likec4/commit/5ebbc03da84c59d62c6ca7c3e7ba65abfbc3bdaf)), closes [#1594](https://github.com/likec4/likec4/issues/1594)


# [1.22.0](https://github.com/likec4/likec4/compare/v1.21.1...v1.22.0) (2025-02-13)

### Features

* **Revamped search**

  <img src="https://github.com/user-attachments/assets/8e6ec03b-7a0f-4089-bc99-1406160985d9" />
  
  thanks @davydkov, closes [#1553](https://github.com/likec4/likec4/issues/1553)

* **cli:** added an option to set the listen address of serve and preview commands, thanks @pavelpykhtin, ([#1559](https://github.com/likec4/likec4/issues/1559)) ([3522c5d](https://github.com/likec4/likec4/commit/3522c5dc49e6ec16c77ed1c1cca8545eeda0ef9b)), closes [#1526](https://github.com/likec4/likec4/issues/1526)
* **cli:**  check for new releases and notify if update available ([#1574](https://github.com/likec4/likec4/issues/1574)) ([d57fc40](https://github.com/likec4/likec4/commit/d57fc4063ca151131a48dced630d7ed5d1b97201)), closes [#1573](https://github.com/likec4/likec4/issues/1573)


### Bug Fixes

* Extended view not generated when using dot (closes [#1582](https://github.com/likec4/likec4/issues/1582))



## [1.21.1](https://github.com/likec4/likec4/compare/v1.21.0...v1.21.1) (2025-02-08)

### Bug Fixes

* **cli**: broken "--use-dot" in 1.21.0 (closes [#1563](https://github.com/likec4/likec4/issues/1563))


# [1.21.0](https://github.com/likec4/likec4/compare/v1.20.3...v1.21.0) (2025-02-07)

### 🚀 Features

* **Various sizes**  
  Change size of the element with new properties: `size`, `padding` and `textSize`
  
  <img width="806" alt="SCR-20250207-mchv-2" src="https://github.com/user-attachments/assets/bf534b85-7b89-490b-bce1-5982e0388377" />

  [Documentation](https://likec4.dev/dsl/styling/#size) (thanks @davydkov)

* **where in deployment views**  
  Support `where` in deployment views predicates.   
  thanks @pavelpykhtin, [#1442](https://github.com/likec4/likec4/issues/1442)
  
* **Extending element tags**   
  Extend element with additional tags, links and metadata:
  ```zig
  model {
    extend cloud {
      // Add tags
      #additional-tag, #another-tag
  
      // Add metadata
      metadata {
        prop1 'value1'
      }
  
      // Add links
      link ../src/index.ts#L1-L10
    }
  }
  ```
  thanks @davydkov, [#1557](https://github.com/likec4/likec4/issues/1557) closes [#666](https://github.com/likec4/likec4/issues/666)
  
* **lsp:** semantic tokens for global styles, predicates and groups (thanks @pavelpykhtin, closes [#1182](https://github.com/likec4/likec4/issues/1182))


### Bug Fixes

* **diagram:** compound nodes miss icons (thanks @pavelpykhtin, [#1550](https://github.com/likec4/likec4/issues/1550)) ([214c951](https://github.com/likec4/likec4/commit/214c95106e03d266d02c9b529fbf666f36969716)), closes [#1482](https://github.com/likec4/likec4/issues/1482)
* **diagram:** nonresponsive UI after navigation in RelationshipBrowser (thanks @davydkov, [a4db769](https://github.com/likec4/likec4/commit/a4db76980020682d2c96d61dbef0a4a653e9b006))


## [1.20.3](https://github.com/likec4/likec4/compare/v1.20.2...v1.20.3) (2025-02-06)

### Improvements

* **cli:** Add --output-single-file flag to build give self-contained HTML file (thanks @rnwood, [#1510](https://github.com/likec4/likec4/issues/1510))
* **diagram:** Added go-to-source button to nodes inside relationship browser (thanks @pavelpykhtin, [#1485](https://github.com/likec4/likec4/issues/1485))

### Bug Fixes

* **diagram:**  boundaries of a parent node calculated incorrectly on manual layout (thanks @pavelpykhtin, closes [#1516](https://github.com/likec4/likec4/issues/1516))
* **layout:** nesting of the groups on 3+ level (thanks @pavelpykhtin, closes [#1519](https://github.com/likec4/likec4/issues/1519))
* **diagram:** `n.incoming().flatMap is not a function` in safari (thanks @davydkov, [afd6293](https://github.com/likec4/likec4/commit/afd6293e6cf4039b4fa238158e33764d6970e4da))
* **layout:** dont use `pack` in graphviz (thanks @davydkov, [#1512](https://github.com/likec4/likec4/issues/1512))

### New Contributors

@rnwood made their first contribution in [#1510](https://github.com/likec4/likec4/issues/1510)


## [1.20.2](https://github.com/likec4/likec4/compare/v1.20.1...v1.20.2) (2025-02-01)

### Improvements

* `multiple` style option (thanks @davydkov, [#1478](https://github.com/likec4/likec4/issues/1478)) ([5beae43](https://github.com/likec4/likec4/commit/5beae43be4bdc2f4001bb2c18fe5e5f525c8cf4d))

  <img width="400" alt="SCR-20250201-ozip" src="https://github.com/user-attachments/assets/b103ae95-f5ac-4d91-8e58-c388e3426ba0" />

* **lsp:** format deployment and global predicates syntax  (thanks @pavelpykhtin, [#1484](https://github.com/likec4/likec4/issues/1484)) ([0d0d5ba](https://github.com/likec4/likec4/commit/0d0d5badc91f6ab62512bdc0b052d8ef5dee0fbe))
* **lsp:** `likec4-language-server` as standalone server ([#1501](https://github.com/likec4/likec4/issues/1501)) ([3f5d053](https://github.com/likec4/likec4/commit/3f5d0539a48131e9e7b9c36ea68b0b6105dfb482))
* **diagram:** animations in RelationshipsBrowser
* **diagrams:** hide buttons and edge labels if zoom too small ([e67e2fe](https://github.com/likec4/likec4/commit/e67e2fe8c8564074a367e3d47288f45c550d31c5))
* **diagrams:** render only visible elements if total number of nodes is more than 75 ([4d6ac08](https://github.com/likec4/likec4/commit/4d6ac0862481126fd96fa587ca12cbbe45b20354))


### Bug Fixes

* **playground:** mantine provider should stay in the root of the app ([19aeb57](https://github.com/likec4/likec4/commit/19aeb5740733e4dcb0232d945ce527021f89085d))


## [1.20.1](https://github.com/likec4/likec4/compare/v1.20.0...v1.20.1) (2025-01-27)

### Bug Fixes

* **vscode:** broken layout in previews (thanks @pavelpykhtin, [#1472](https://github.com/likec4/likec4/issues/1472)) ([e50cf63](https://github.com/likec4/likec4/commit/e50cf63a69732a8e30796dd9830f3efc507e1543)), closes [#1471](https://github.com/likec4/likec4/issues/1471)



# [1.20.0](https://github.com/likec4/likec4/compare/v1.19.2...v1.20.0) (2025-01-27)

### 🚀 Features

* **Filter relationships by tag or kind of its endpoints**

  ```zig
  include
    // only relationships outgoing from elements with with tag #next
    cloud.* -> amazon.*
      where source.tag is #next,

    // only incoming relations of elements with kind microservice
    -> *
      where target.kind is microservice
  ```

  [Documentation](https://likec4.dev/dsl/views/#filter) (thanks @pavelpykhtin)

* **Refreshed UI and more customization options for React components**

  ![image](https://github.com/user-attachments/assets/ca8bbb0f-aa14-4606-906f-4c26e6d82101)
  
  More options available - [LikeC4ViewProps](https://github.com/likec4/likec4/blob/main/packages/likec4/app/react/components/LikeC4View.props.ts)

> [!WARNING]  
> Diagrams migrated to React 19, you may get dependency resolution issues


### Bug Fixes

* **diagram:** added key prop for action bar content (thanks @pavelpykhtin, [#1443](https://github.com/likec4/likec4/issues/1443)) ([3d9e7f8](https://github.com/likec4/likec4/commit/3d9e7f8e62439da015fc65549b8836940cdbb465)), closes [#1424](https://github.com/likec4/likec4/issues/1424)
* **diagram:** adjusted label and endpoint position of relationships on manual layout (thanks @pavelpykhtin, [#1445](https://github.com/likec4/likec4/issues/1445)) ([629271e](https://github.com/likec4/likec4/commit/629271ee99b6a76aa4e1764b558632d802b9921c)), closes [#1322](https://github.com/likec4/likec4/issues/1322)
* **diagram:**  for '<iterator object>.<array function> is not a function' (thanks @pavelpykhtin, [#1463](https://github.com/likec4/likec4/issues/1463)) ([e141586](https://github.com/likec4/likec4/commit/e14158681853aedb50b272c64532fe650f493500)), closes [#1425](https://github.com/likec4/likec4/issues/1425)
* **diagram:**  hide element toolbar when more then one element selected (thanks @pavelpykhtin, [#1446](https://github.com/likec4/likec4/issues/1446)) ([56acca0](https://github.com/likec4/likec4/commit/56acca0478724d6becf4a66a3fe395142cb4e7be)), closes [#1422](https://github.com/likec4/likec4/issues/1422)
* **diagram:**  incorrect merge of relation labels (thanks @davydkov, [#1435](https://github.com/likec4/likec4/issues/1435)) ([a7b4120](https://github.com/likec4/likec4/commit/a7b4120cdd4c9545521cbc203a60c3e5ce84aea2))
* **diagram:**  overlay transparency in FF (thanks @pavelpykhtin, [#1462](https://github.com/likec4/likec4/issues/1462)) ([f59308f](https://github.com/likec4/likec4/commit/f59308f02ef7e0ba4684fd30e0655aff41e2dd5c)), closes [#1420](https://github.com/likec4/likec4/issues/1420)
* **diagram:**  incorrect merge of relation labels (thanks @davydkov, [#1435](https://github.com/likec4/likec4/issues/1435)) ([a7b4120](https://github.com/likec4/likec4/commit/a7b4120cdd4c9545521cbc203a60c3e5ce84aea2))
* **diagram:**  Icon does not render in 'Browse relationships' view (thanks @davydkov,  closes [#1219](https://github.com/likec4/likec4/issues/1219))



## [1.19.2](https://github.com/likec4/likec4/compare/v1.19.1...v1.19.2) (2025-01-06)

### Bug Fixes

* **vscode:** disable dynamic import in vscode extension (closes [#1415](https://github.com/likec4/likec4/issues/1415))


## [1.19.1](https://github.com/likec4/likec4/compare/v1.19.0...v1.19.1) (2025-01-03)

### Fixes

* **likec4**: change `package.json` custom condition to `sources` (closes [#1405](https://github.com/likec4/likec4/issues/1405))
* **vscode**: add error handling and logging in documentation provider
* **vscode:** do not report handled errors to telemetry ([1b16c42](https://github.com/likec4/likec4/commit/1b16c42740f2b8aea7a1b1fa6f197d65008f3886))


# [1.19.0](https://github.com/likec4/likec4/compare/v1.18.0...v1.19.0) (2025-01-01)

### 🎄 New Years improvements 🎄 

This release introduces significant improvements in the computation of view predicates.  
These improvements may lead to changes in the final layout, as the order of included elements is now strictly adhered to.

* **fix:** error generating png behind proxy [#1374](https://github.com/likec4/likec4/issues/1374)
* **fix:** graphviz memory seg fault for deployment views ([c067973](https://github.com/likec4/likec4/commit/c067973b54b399e56174a40c57d8130d822e545c))
* **fix:** node toolbar is not displayed in the editor ([dc9ebac](https://github.com/likec4/likec4/commit/dc9ebace92643b582b47de66deee4eead51d21ac))
* **fix:** parent-relations can't contain comments (thanks @davydkov, closes [#911](https://github.com/likec4/likec4/issues/911))
* **fix:** relation being yielded twice (thanks @pavelpykhtin, [#1364](https://github.com/likec4/likec4/issues/1364)) ([#1384](https://github.com/likec4/likec4/issues/1384)) ([bd0bc03](https://github.com/likec4/likec4/commit/bd0bc0303209ea069821d4a9debb193fd958b8aa))
* **fix:** reset connection points on self-referencing relations (thanks @pavelpykhtin, [#1383](https://github.com/likec4/likec4/issues/1383)) ([c3c57ab](https://github.com/likec4/likec4/commit/c3c57abf1960395841433bb64943e2ef46114145))
* **vscode:** extension breaks on bad symbolic links ([ce22e3e](https://github.com/likec4/likec4/commit/ce22e3ed62034c035dbf19f19a3fe0fe38cb5347)), closes [#1321](https://github.com/likec4/likec4/issues/1321)
* **vscode:** invalid usage of performance marks [#1350](https://github.com/likec4/likec4/issues/1350) ([#1359](https://github.com/likec4/likec4/issues/1359)) ([826fb6f](https://github.com/likec4/likec4/commit/826fb6f1d64c342c46d51816a0c48be8caeaa093))
* **vscode:** downgrade vscode and @types/vscode dependencies to version 1.84.0 for stackblitz compatibility ([e955761](https://github.com/likec4/likec4/commit/e955761a597651fc3533f629059f1450a9a51ac8))
* **fix:** unresolved parent in model ([25a3774](https://github.com/likec4/likec4/commit/25a37749ffd59eed2610107e08682f1986797d51))
  

# [1.18.0](https://github.com/likec4/likec4/compare/v1.17.1...v1.18.0) (2024-12-12)

### 🚀 Features

* **Deployment Model**  
  One of the most highly requested additions to our project!
  This feature introduces a physical model with its own structure and elements, referencing the logical model while inheriting its relationships.
  
  ![SCR-20241212-posb](https://github.com/user-attachments/assets/1db429ae-14c0-4f66-9fc1-294c7b6fc6c5)

  The syntax and approach remain consistent with existing ones.  
  This is just the first step, and we would love your feedback!  
  [Documentation](https://likec4.dev/dsl/deployment/model/) and [RFC](https://github.com/likec4/likec4/discussions/1269)

* **Include all descendants**  
  New predicate selector `.**` lets you include all descendants, making it especially useful for deployment views.  
  Thanks to @Cyclonit for contributing! 🎉 [#1310](https://github.com/likec4/likec4/issues/1310), closes [#1259](https://github.com/likec4/likec4/issues/1259)  

* **Typesafe LikeC4 model**  
  Generate TypeScript code from your model, complete with type definitions for elements and views. Enjoy code completion and type checks in every React hook or API call!

  ![SCR-20241212-posb](https://github.com/user-attachments/assets/c6c4196d-43ae-4194-b947-45e9685a0a71)
  
  📖 Documentation is currently in progress. Stay tuned!

* **UI improvements**

  - Added descriptions and links to the relationship context menu.  
    Thanks to @pavelpykhtin! [#1307](https://github.com/likec4/likec4/issues/1307)

  - Now supports carriage returns in titles.  
    Thanks, @davydkov! Closes [#1324](https://github.com/likec4/likec4/issues/1324)




## [1.17.1](https://github.com/likec4/likec4/compare/v1.17.0...v1.17.1) (2024-11-28)

### Improvements

* **diagrams:** smart Layout commands (thanks @pavelpykhtin, [#1238](https://github.com/likec4/likec4/issues/1238))
* **diagrams:** diagram search (thanks @pavelpykhtin, [#1244](https://github.com/likec4/likec4/issues/1244))
* **diagrams:** highlight in Diagram Search (thanks @Cyclonit, [#1251](https://github.com/likec4/likec4/issues/1251))
* **diagrams:** button to open relationships overlay (thanks @pavelpykhtin, [#1242](https://github.com/likec4/likec4/issues/1242))
  
### Bug Fixes

* **export:** enhance PNG export with viewport sizing and HTTPS error handling (thanks @davydkov)
* **diagrams:** style properties being ignored for dynamic relationships (thanks @pavelpykhtin, [#1280](https://github.com/likec4/likec4/issues/1280))
* **diagrams:** styles for webcomponent  (thanks @pavelpykhtin, [#1297](https://github.com/likec4/likec4/issues/1297))
  

# [1.17.0](https://github.com/likec4/likec4/compare/v1.16.0...v1.17.0) (2024-11-15)

### 🚀 Features  

* **Element details**  
  Notation, full description, links, metatdata, tags, relationships (global/view scopes), other views...   
  Disabled by default in React components (to turn on use `enableElementDetails`)

  https://github.com/user-attachments/assets/52966fab-9662-4132-974b-2c68a6a879cd
  
* Render icon on containers  (thanks @davydkov, closes [#1195](https://github.com/likec4/likec4/issues/1195))
* Disable icon with `none`  (thanks @davydkov, closes [#1026](https://github.com/likec4/likec4/issues/1026))
* Traverse symlinks in the workspace (thanks @hubertmis, [#1213](https://github.com/likec4/likec4/issues/1213))

### Bug Fixes

* **diagram:** do not render long description texts  (thanks @davydkov, closes [#1227](https://github.com/likec4/likec4/issues/1227))


# [1.16.0](https://github.com/likec4/likec4/compare/v1.15.1...v1.16.0) (2024-11-04)

### 🚀 Features  

* Global predicates (thanks @hubertmis, [#1173](https://github.com/likec4/likec4/issues/1173))

  ```zig
  global {
    predicateGroup new_cloud_service {
      include cloud.*
        where kind is microservice
      exclude *
        where tag is #deprecated
    }
  }
  views {
    view of newServices {
      include *
      global predicate new_cloud_service
    }
    view of newBackendServices {
      include *
      global predicate new_cloud_service
    }
  }
  ```

### Bug Fixes

* relation excluded but edge is not updated (thanks @pavelpykhtin, closes [#1193](https://github.com/likec4/likec4/issues/1193))


## [1.15.1](https://github.com/likec4/likec4/compare/v1.15.0...v1.15.1) (2024-10-30)

### Fixes and improvements

* apply global styles in all building scenarios (thanks @hubertmis, closes [#1180](https://github.com/likec4/likec4/issues/1180))
* `where` predicate on apply custom properties to relation (thanks @pavelpykhtin, closes [#1176](https://github.com/likec4/likec4/issues/1176))
* formatter support for groups and global styles (thanks @pavelpykhtin, [#1177](https://github.com/likec4/likec4/issues/1177))


# [1.15.0](https://github.com/likec4/likec4/compare/v1.14.0...v1.15.0) (2024-10-26)

### 🚀 Features  

* **Style groups:**  
  Global styles can be grouped and applied together:
  ```zig
  global {
    // Define style group
    styleGroup common_styles {
      style * {
        color muted
        opacity 10%
      }
      style singlePageApplication, mobileApp {
        color secondary
      }
    }
  }
  
  views {
    view mobileApp of mobileApplication {
      include *
  
      // Apply common styles
      global style common_styles
    }
  }
  ```
  Also, global styles and groups can be referenced in  `views {}` blocks (local styles) and applied to all views in a block.  
  [Documentation](https://likec4.dev/dsl/views/#shared-style-groups) (thanks @hubertmis, [#1143](https://github.com/likec4/likec4/issues/1143), [#1161](https://github.com/likec4/likec4/issues/1161))

* **Adhoc `group` elements**
  ```zig
  view {
    group 'Third-parties' {
      group 'Integrations' {
        group 'Analytics' {
          include * where tag is #analytics
        }
        group 'Marketing' {
          include * where tag is #marketing
        }
      }
      group 'Monitoring' {
        include * where tag is #marketing
      }
    }
  }
  ```
  [Documentation](https://likec4.dev/dsl/views/#groups) (thanks @davydkov, [#1140](https://github.com/likec4/likec4/issues/1140))

### Fixes and improvements

* **diagram**: bundled icons vary in color scheme (thanks @pavelpykhtin, [#1149](https://github.com/likec4/likec4/issues/1149), closes [#1097](https://github.com/likec4/likec4/issues/1097))
* **diagram:** control points are not draggable under the edge label (thanks @pavelpykhtin, [#1104](https://github.com/likec4/likec4/issues/1104))
* **lsp:** style for relationship predicates `where` together `with`, not work style on (thanks @pavelpykhtin, [#1147](https://github.com/likec4/likec4/issues/1147) closes [#1144](https://github.com/likec4/likec4/issues/1144))
* **react:** react component filter stopped working (thanks @davydkov, closes [#1145](https://github.com/likec4/likec4/issues/1145)
* **vscode:** enhance style completion snippets (thanks @davydkov)


# [1.14.0](https://github.com/likec4/likec4/compare/v1.13.0...v1.14.0) (2024-10-20)

### 🚀 Features  

* **View relationship decomposition**:  
  Relationship `Cloud -> Amazon` from [examples](https://github.com/likec4/likec4/tree/main/examples/diagrams-dev/likec4):
  
  ![SCR-20241020-dgyj](https://github.com/user-attachments/assets/3983d564-bc7a-4f98-9509-5788064ce7cb)

* **Global styles:**  
  Shared global styles
  ```zig
  global {
    style mute_all * {
      color muted
      opacity 10%
    }
  }
  
  views {
    view of app {  
      global style mute_all
      style cloud.* {
        color green
      }
    }  
  }
  ```
  [Documentation](https://likec4.dev/dsl/views/#shared-global-styles) (thanks @hubertmis, closes [#1058](https://github.com/likec4/likec4/issues/1058))

* **Build with `--base './'`**:  
  Allows to build a relocatable website (thanks @rumpelrausch, closes [#1111](https://github.com/likec4/likec4/issues/1111))

### Bug Fixes

* **diagram:** edges with no nearby nodes are not visible in the canvas (thanks @davydkov, closes [#1109](https://github.com/likec4/likec4/issues/1109))

  

# [1.13.0](https://github.com/likec4/likec4/compare/v1.12.2...v1.13.0) (2024-10-18)

### 🚀 Features  

* **Browse relationships**
  
  ![SCR-20241018-didx](https://github.com/user-attachments/assets/6565e3da-3f9e-4991-8d2c-e28b88c94375)

  Disabled by default in generated components, to enable:
  ```tsx
  import { LikeC4View } from './likec4.generated'

  <LikeC4View
    viewId="index"
    enableRelationshipsBrowser
    />
  ```
  Share your feedback in our [Discussions](https://github.com/likec4/likec4/discussions)

* **Local styles:**  
  Shared styles in views block (thanks @hubertmis, [#1113](https://github.com/likec4/likec4/pull/1113))
  
  ```zig
  views {
    // apply to all views in this views block
    style * {
      color muted
      opacity 10%
    }

    view apiApp of internetBankingSystem.apiApplication {
      include *
    }

    view mobileApp of internetBankingSystem.mobileApplication {
      include *
    }
  }
  ```
  [Documentation](https://likec4.dev/dsl/views/#shared-local-styles)

* **Alignment tools:**  
  Implemented alignment tools for manual layouting  (thanks @pavelpykhtin, [#1099](https://github.com/likec4/likec4/issues/1099))
  
  ![alignment-tools](https://github.com/user-attachments/assets/9d6e5b1b-e2af-4cce-bac5-b0a3a1dfc73b)

### Bug Fixes

* **react:** `crow` arrow type (thanks @pavelpykhtin, [#1092](https://github.com/likec4/likec4/issues/1092))
* **react:** `controls` property to show/hide top left panel ([b36880f](https://github.com/likec4/likec4/commit/b36880f7797e011eec54760a88e3190237140c45))
* **react:** `styleNonce` property for ReactLikeC4 ([0c78314](https://github.com/likec4/likec4/commit/0c7831419034c8a9a47dc7ded597270987f81b06))
* **react:** Text colors / backdrop not updated until page refresh when toggling between light and dark mode [#1098](https://github.com/likec4/likec4/issues/1098) ([6bb6cf3](https://github.com/likec4/likec4/commit/6bb6cf384efbacc0d98951a7e1f915147e7eb4a0))
* **vscode:** autocompletion of "specification", "views" and "model" broken (closes [#1102](https://github.com/likec4/likec4/issues/1102))


## [1.12.2](https://github.com/likec4/likec4/compare/v1.12.1...v1.12.2) (2024-10-10)

### Improvements

* **vscode:** transparent layout spacing panel for a clearer preview of changes

### Bug Fixes

* unable to open diagram from Sidebar (thanks @davydkov, closes [#1091](https://github.com/likec4/likec4/issues/1091))


## [1.12.1](https://github.com/likec4/likec4/compare/v1.12.0...v1.12.1) (2024-10-10)

### Improvements

* **preview:** change grouping in sidebar
* **react:** change layout spacings from the UI
* **react:** toolbar to change styles (instead of panel)

### Bug Fixes

* **vscode:** nonce parameter for marking dynamic styles inserted by components (thanks @pavelpykhtin, [#1065](https://github.com/likec4/likec4/issues/1065) ([89be0f1](https://github.com/likec4/likec4/commit/89be0f12e4c0b5bab0e56dc7bf624e928768d16a))
* **react:** react component open full-screen mode (thanks @davydkov, [4cd1464](https://github.com/likec4/likec4/commit/4cd1464b7f861a9520f05fd8616cfd6aee141fa7)), closes [#1055](https://github.com/likec4/likec4/issues/1055)
* **vscode:** space being added/removed before colon (thanks @pavelpykhtin, [#1074](https://github.com/likec4/likec4/issues/1074)) ([fd3624c](https://github.com/likec4/likec4/commit/fd3624c74be1ec71253c48f110934c7b236dc313))



# [1.12.0](https://github.com/likec4/likec4/compare/v1.11.0...v1.12.0) (2024-10-07)

### 🚀 Features  

* **dsl:** params to adjust autolayout (thanks @pavelpykhtin, [#1053](https://github.com/likec4/likec4/issues/1053))

  ```zig
  view {
    include *
    autoLayout LeftRight 120 110
  }
  ```
  [Documentation](https://likec4.dev/dsl/views/#auto-layout)

* **dsl:** add Azure iconset (thanks @msisolak [#1040](https://github.com/likec4/likec4/pull/1040))
* publish extension to Open VSX (thanks @davydkov, [#908](https://github.com/likec4/likec4/issues/908))


### Bug Fixes

* **diagram:** unable to drag multiple nodes (thanks @pavelpykhtin, [#1043](https://github.com/likec4/likec4/issues/1043))
* **diagram:** long node names overflow in node options panel (thanks @pavelpykhtin)
* **diagram:** deleted control point being reverted on mouse up (thanks @pavelpykhtin, [#1044](https://github.com/likec4/likec4/pull/1044) )
* **vscode**: extra space in dynamic step (thanks @pavelpykhtin, [#1056](https://github.com/likec4/likec4/issues/1056))
* **app:** configure kroki url with `VITE_KROKI_D2_SVG_URL`  (thanks @davydkov, [#1060](https://github.com/likec4/likec4/issues/1060))
* **deps:** upgrade playwright to 1.47.2 ([73758c6](https://github.com/likec4/likec4/commit/73758c69825642bc62eb15e33e428352f5116cee))
* **vscode:** `--enable-source-maps` in node extension ([eef8153](https://github.com/likec4/likec4/commit/eef8153462007c8249e70dc289eef9993080a730))



# [1.11.0](https://github.com/likec4/likec4/compare/v1.10.1...v1.11.0) (2024-09-24)

### 🚀 Features  

* **Relationship details**

  On hover displays direct relationships and resolved from nested. If relationship has `navigateTo` - displays navigation link
    
  <img width="681" alt="SCR-20240924-uhpz" src="https://github.com/user-attachments/assets/de90231d-2eaa-4b20-b508-f3f72e420d24">

  To disable - set `showRelationshipDetails={false}` in react component

* **Improved layout editing**

  Thanks to @pavelpykhtin, now it is possible add control points with right click, or reset all control points  
  Example here [#1013](https://github.com/likec4/likec4/pull/1013)

* **New API `LikeC4Model.Layouted`**

  Difference between `LikeC4Model.Computed` and `LikeC4Model.Layouted` - is that second one also includes layout data (dimensions, positions), that is needed for rendering

  ```ts
  import { LikeC4 } from 'likec4'
  
  const likec4 = await LikeC4.fromWorkspace()
  
  // Sync and fast
  const model = likec4.computedModel()
  model
    .element('cloud.backend.api')
    .incoming() // relationships incoming to the element
    .filter(r => r.tags.includes('http')) // filter by tags
    .map(r => r.source) // get source elements

  // Async, includes layout data (dimensions, positions...)
  const diagram = await likec4.layoutedModel().view('index')
  ```

  Generated React component also exports instance of `LikeC4Model.Layouted`, and hooks to use inside your app.


## [1.10.1](https://github.com/likec4/likec4/compare/v1.10.0...v1.10.1) (2024-09-17)

### Bug Fixes

* **dsl:** derived connection from multiple relationships with same endpoints always picks the last relationship ([12b1899](https://github.com/likec4/likec4/commit/12b1899a21e587f2d41ecec48fb535b8b45fcd69)), closes [#990](https://github.com/likec4/likec4/issues/990)
* **vscode:** preview does not work in remote workspaces ([90e4725](https://github.com/likec4/likec4/commit/90e4725231ec011b88919d70e38311694f1581c1)), closes [#1004](https://github.com/likec4/likec4/issues/1004)
* **react:** edge changes being reverted on mouse up  (thanks @pavelpykhtin, [#1008](https://github.com/likec4/likec4/issues/1008))
* **vscode:** space being inserted into relation's source  (thanks @pavelpykhtin, [#1001](https://github.com/likec4/likec4/issues/1001))


# [1.10.0](https://github.com/likec4/likec4/compare/v1.9.0...v1.10.0) (2024-09-12)

### 🚀 Features  

* **Parallel** steps and **notes** in dynamic views
  
  <img width="661" alt="image" src="https://github.com/user-attachments/assets/8454d296-6ffe-4ea2-a9d8-0d72aff70105">
  [Playground example](https://playground.likec4.dev/w/dynamic/)

* **Navigation** for relationships (zoom-in to dynamic views)
  
  ```zig
  model {
    webApp -> backend.api {
      title 'requests data for the dashboard'
      navigateTo dashboardRequestFlow
    }  
  }
  ```
  [Documentation](https://likec4.dev/dsl/relationships/#navigate-to)

* **Code Formatter** in VSCode Extension (thanks @pavelpykhtin, to [#979](https://github.com/likec4/likec4/issues/979))

* New component `ReactLikeC4`
  Low-level component with more control and event listeners.
  
  ```tsx
  const App = () => {
    return (
      <div>
        <ReactLikeC4
          viewId="index"
          pannable={false}
          zoomable
          keepAspectRatio={false}
          showElementLinks={false}
          showDiagramTitle={false}
          onNodeClick={...}
        />
      </div>
    )
  }
  ```
  [Documentation](https://likec4.dev/tooling/codegen/#reactlikec4)
  

### Bug Fixes

* relative links are translated into undeployable `file://` (@davydkov [#982](https://github.com/likec4/likec4/issues/982)) ([7b0ea80](https://github.com/likec4/likec4/commit/7b0ea800ad56307d85b2d5d36d177a19280e2e6c)), closes [#978](https://github.com/likec4/likec4/issues/978)





# [1.9.0](https://github.com/likec4/likec4/compare/v1.8.1...v1.9.0) (2024-09-07)

### 🚀 Features  

* **LikeC4 Model API**
  Access and traverse your architecture model programmatically using the LikeC4 Model API.
  ```ts
  import { LikeC4 } from "likec4"

  const likec4 = await LikeC4.fromWorkspace(`....`)
  
  // Validation errors
  console.log(likec4.getErrors())
  
  // Traverse the model
  const model = likec4.model()
  model
    .element('cloud.backend.api')
    .incoming() // relationships incoming to the element
    .filter(r => r.tags.includes('http')) // filter by tags
    .map(r => r.source) // get source elements
  
  // Layouted views
  const diagrams = await likec4.diagrams()
  ```

  [Documentation](https://likec4.dev/tooling/model-api/)
  
* **Custom colors**
  ```zig
  specification {
    color custom #6BD731
  
    element customer {
      notation "Person, Customer"
      style {
        shape person
        color custom
      }
    }
  }
  ```
  Thanks to [@pavelpykhtin](https://github.com/pavelpykhtin), resolves [#916](https://github.com/likec4/likec4/issues/916)
  
### Bug Fixes

* **vite-plugin:** fail-safe `virtual:likec4/overview-graph` ([ed85e5f](https://github.com/likec4/likec4/commit/ed85e5f495db7907854e9c7590535eefed234be0)), closes [#959](https://github.com/likec4/likec4/issues/959)


## [1.8.1](https://github.com/likec4/likec4/compare/v1.8.0...v1.8.1) (2024-08-30)

### Bug Fixes

* **dsl:** warn message about ambiguous alternatives

### Improvements

* **dsl:** allow `this` and `it` as target
  ```zig
  model {
    frontend = component  {
      customer -> it 'opens in browser'
    }
  }
  ```


# [1.8.0](https://github.com/likec4/likec4/compare/v1.7.4...v1.8.0) (2024-08-27)

### 🚀 Features  

* View notations
  
  ```zig
  specification {
  
    element customer {
      notation "Person, Customer"
      style {
        shape person
        color green
      }
    }
  
    element staff {
      notation "Person, Staff"
      style {
        shape person
      }
    }
  }
  ```

  [Documentation](https://likec4.dev/dsl/notations/)
  
  <img width="436" alt="SCR-20240827-nhav" src="https://github.com/user-attachments/assets/bcc151e2-6c31-4b72-8651-a39ba79351d0">

* `technology` for relationships  (Thanks to [@pavelpykhtin](https://github.com/pavelpykhtin), resolves [#576](https://github.com/likec4/likec4/issues/576))
* `title` for links  (Thanks to [@pavelpykhtin](https://github.com/pavelpykhtin), resolves [#871](https://github.com/likec4/likec4/issues/871))
* `metadata` in DSL (Thanks to [@pavelpykhtin](https://github.com/pavelpykhtin))
* [experimental] overview all views with `use-overview` flag in cli

## [1.7.4](https://github.com/likec4/likec4/compare/v1.7.3...v1.7.4) (2024-08-17)

### Bug Fixes

* broken export to png
* add downloadedRef to track if download has already occurred
* compact diagram title panel and zoom out on double click


## [1.7.3](https://github.com/likec4/likec4/compare/v1.7.2...v1.7.3) (2024-08-16)

### Improvements

* **dsl:** hiding relationship titles in views (closes [#910](https://github.com/likec4/likec4/issues/910))
* **react:** `where` filter on react components (closes [#872](https://github.com/likec4/likec4/issues/872), [documentation](https://likec4.dev/tooling/codegen/#filter))
  
  ```jsx
  // Display elements and relationships where:
  // - tag is not 'legacy'
  // - and
  // - tag is 'v1' or 'v2'
  <LikeC4View
    viewId="index"
    where={{
      and: [
        { tag: { neq: 'legacy' } },
        {
          or: [
            { tag: { eq: 'v1' } },
            { tag: { eq: 'v2' } }
          ]
        }
      ]
    }}/>
  ```
* **react:** export to png in new tab ([198d79e](https://github.com/likec4/likec4/commit/198d79e19d99a8e68393dad76ee6f670e44e491e))
* **cli:** export png to flat directory ([bcd23dd](https://github.com/likec4/likec4/commit/bcd23ddf46359a354d262c1adf47b60fd46bde61))
* **cli:** warn layout drifts ([49c1100](https://github.com/likec4/likec4/commit/49c1100fa09d15a10913e76f41f8d83730515577))



## [1.7.2](https://github.com/likec4/likec4/compare/v1.7.1...v1.7.2) (2024-08-10)

### Bug Fixes

* **vscode:** regression with preview panel ([ba61a7b](https://github.com/likec4/likec4/commit/ba61a7b7064150d3bc3ed69444b201991a9bfa84))



## [1.7.1](https://github.com/likec4/likec4/compare/v1.7.0...v1.7.1) (2024-08-10)

### Bug Fixes

* **cli:** regression on `build` command ([5ebb251](https://github.com/likec4/likec4/commit/5ebb251d76ff4a68c200d91f9bde4b2d8f11a6fa))



# [1.7.0](https://github.com/likec4/likec4/compare/v1.6.1...v1.7.0) (2024-08-10)

### 🚀 Features  

* `where` in predicates

  ```zig
  // include only microservices from nested
  include cloud.*
    where kind is microservice
  
  // only microservices and not deprecated
  include cloud.*
    where
       kind == microservice and // possible to use 'is' or '=='
       tag != #deprecated       // possible to use 'is not' or '!='
  
  // Use logical operators
  include cloud.*
    where
       not (kind is microservice or kind is webapp)
       and tag is not #legacy
       and (tag is #v1 or tag is #v2)
  ```

  This also applies to relationship predicates (Resolves [#593](https://github.com/likec4/likec4/issues/593))

  ```zig
  include
    // only relationships with tag #messaging
    cloud.* <-> amazon.*
      where tag is #messaging,
  
    // only incoming http-requests
    -> backend
      where kind is http-request
  ```

  [Documentation](https://likec4.dev/dsl/views/#filter)

### Improvements  

* activate dynamic walkthrough on edge double click
* improve manual layouts
* add `description` and `technology` to relationship (not yet rendered)
* allow wildcard predicate together with `with`



## [1.6.1](https://github.com/likec4/likec4/compare/v1.6.0...v1.6.1) (2024-07-24)


### Bug Fixes

* **cli:** vite error on build with v1.6.0  ([#860](https://github.com/likec4/likec4/issues/860))
* **deps:** update dependency playwright to v1.45.2 ([#783](https://github.com/likec4/likec4/issues/783)) ([73ddd69](https://github.com/likec4/likec4/commit/73ddd69d968a48d77688daaf81e975beba9642a3))



# [1.6.0](https://github.com/likec4/likec4/compare/v1.5.0...v1.6.0) (2024-07-20)

### Features

* Bundled icons

  ```zig
  model {
    fn = service 'Lambda Function' {
      icon aws:lambda
    }
    k8s = service 'K8s Service' {
      icon gcp:google-kubernetes-engine
    }
    pg = storage 'PostgreSQL' {
      icon tech:postgresql
    }
  }
  ```
  
  <img width="733" alt="Screenshot 2024-07-20 at 14 29 03" src="https://github.com/user-attachments/assets/7314ee25-cbea-4b3e-9293-f0db891cd69b">

  Besides, icon can be just an element property, skipping `style` block
  
* Improved code completion in view predicates

# [1.5.0](https://github.com/likec4/likec4/compare/v1.4.0...v1.5.0) (2024-07-12)

### Features

* Customize relationships per view


  ```zig
  include
    // Include elements if they have any relationships
    // and customize these relationships
    cloud.* <-> amazon.* with {
      color red
      line solid
    },
    // or only directed 
    customer -> cloud.*  with {
      // Override label
      title 'Customer uses cloud'
    }
  ```


### Bug Fixes and Improvements

* **diagram:** increased labels font size for better readability ([f31dc2f](https://github.com/likec4/likec4/commit/f31dc2f562bf3d58fc3249df93885e1111777500))
* **diagram:** add css autoprefixer and inject xystore to diagram store ([a15644b](https://github.com/likec4/likec4/commit/a15644b4967c52d27a358dc49125777fe8dd988a))
* **diagram:** arrow types ([86eca4c](https://github.com/likec4/likec4/commit/86eca4cfb950e42324d629a485f558d78084c647)), closes [#755](https://github.com/likec4/likec4/issues/755)
* **diagram:** compound node draggable by title ([9c3ff1f](https://github.com/likec4/likec4/commit/9c3ff1fe9ec3f42e82f43d585e9632c267607530))
* **diagram:** edge rendering ([dbd5a65](https://github.com/likec4/likec4/commit/dbd5a657c502e816611cf73dbaf58bfb21faf209))
* **diagram:** improve edge rendering and label bbox ([a8f8d17](https://github.com/likec4/likec4/commit/a8f8d17cbcea0efb6fbb0b137f1efd7d64bd55a3))
* **edge:** remove control point on dbl click ([831077b](https://github.com/likec4/likec4/commit/831077bf2dee65c95d5600e01c9f9cd7c50d036e))
* **layout:** single relashionships ([ebeaeef](https://github.com/likec4/likec4/commit/ebeaeeff4c129dcfa2791a662767916179e30db2))
* **layout:** update layouts ([851ec59](https://github.com/likec4/likec4/commit/851ec59cbc5fe7b895470cd12133251a11897a22))
* **layout:** wrap edge label ([0f007ff](https://github.com/likec4/likec4/commit/0f007ff5f80cbb584ef82644df25d2d1ed8f0d2f))
* **lsp:** clear diagnostics for on rebuild ([46206df](https://github.com/likec4/likec4/commit/46206dfdb2a0f6210b458fbf030d543357059c8e))
* **lsp:** customize `<->` relationships ([98c8b1f](https://github.com/likec4/likec4/commit/98c8b1f14e324eab804558807ea69734d31b8231))
* **lsp:** semantic token for navigateTo ([09b1a11](https://github.com/likec4/likec4/commit/09b1a116620a7bc913382816982504fa05beafc7))
* **vscode:** update documentSelector if workspaceFolders is empty ([9678ed2](https://github.com/likec4/likec4/commit/9678ed298bb48bf92cf7dea09d09c854c026824f))
* **webcomponent:** improve dynamic view ([65c2961](https://github.com/likec4/likec4/commit/65c2961fd710a0ce60a41731fe808be0fdb0eabe))
* **deps:** update [@xyflow](https://github.com/xyflow) ([#807](https://github.com/likec4/likec4/issues/807)) ([2408e16](https://github.com/likec4/likec4/commit/2408e160f69b0497b0eefbb5c122ab30ad364b36))
* **deps:** update dependency @astrojs/starlight to ^0.24.5 ([#803](https://github.com/likec4/likec4/issues/803)) ([6cc824a](https://github.com/likec4/likec4/commit/6cc824a76b162df30bc4e63504c97ddb0af8c04d))
* **deps:** update dependency astro to ^4.11.5 ([#818](https://github.com/likec4/likec4/issues/818)) ([9cc7f44](https://github.com/likec4/likec4/commit/9cc7f44ad8833defec3c764cae0fafe70e4be852))
* **deps:** update dependency astro-og-canvas to ^0.5.3 ([#835](https://github.com/likec4/likec4/issues/835)) ([bea7ea7](https://github.com/likec4/likec4/commit/bea7ea7e20d4892031df7f42768fd18504423c1a))
* **deps:** update dependency starlight-links-validator to ^0.9.1 ([eea921b](https://github.com/likec4/likec4/commit/eea921b0e8bdbe50a78176a7bf13f650dc9061a9))
* **deps:** upgrade `monaco-vscode` ([36be81e](https://github.com/likec4/likec4/commit/36be81e2e981c288a31df0cdb915ce90496bd129))
* **deps:** upgrade mantine to 7.11 ([23bde17](https://github.com/likec4/likec4/commit/23bde17b43094180b1eaf3466938d6b3c2886e3b))
* **deps:** upgrade typescript to 5.5.2 ([dc996c8](https://github.com/likec4/likec4/commit/dc996c84ac61a58a4801c0ad130cd36e8a5c31c3))


# [1.4.0](https://github.com/likec4/likec4/compare/v1.3.0...v1.4.0) (2024-06-28)

### 🚀 Features  

* **vscode:** disable experimental editor in vscode preferences ([effdef1](https://github.com/likec4/likec4/commit/effdef1402a7df94e659cf6623103a16ac4d04a9))
* **cli:** use dev server when exporting to png (faster) ([9a19db3](https://github.com/likec4/likec4/commit/9a19db3dc686fa4cbf5511b4dcdb9b1d8fe2a796))
* **diagram:** back/forward navigation buttons ([4d258ed](https://github.com/likec4/likec4/commit/4d258ed53a64e4d226b37c15897261bafa36df63))
* **react:** use html dialog for browser ([0981df2](https://github.com/likec4/likec4/commit/0981df2fa93804107635d83a00d28fcf03b68f1c))

### Bug Fixes

* **deps:** upgrade playwright to 1.45.0 ([486140b](https://github.com/likec4/likec4/commit/486140b8370ce7ae0a019c463c4ed913b43674f2))
* **deps:** upgrade vite to 5.3.2 ([cf8956f](https://github.com/likec4/likec4/commit/cf8956f3f5d68bfff667e906ff7ebbf7fea5cd28))
* **diagram:** disable blur filter in safari ([dd14526](https://github.com/likec4/likec4/commit/dd14526ebdbb736c378cb0074edbda2358ab2d02))
* **diagram:** improve rendering in safari ([d530d98](https://github.com/likec4/likec4/commit/d530d988ad987607edc5f5a8169280f2ad270c74))
* **playground:** switch to vertical layout for better mobile experience ([99b6b60](https://github.com/likec4/likec4/commit/99b6b607564b88533b0002286e9c754362c78c59))


# [1.3.0](https://github.com/likec4/likec4/compare/v1.2.2...v1.3.0) (2024-06-23)

### 🚀 Features  

- **View editor**  
  Experimental layout editor (drag elements and relationships)

* **dynamic-view:** hotkeys navigation ([8e36d7b](https://github.com/likec4/likec4/commit/8e36d7b91d4d50e47b05578ba3b4e14e59576bb6)), closes [#769](https://github.com/likec4/likec4/issues/769)
* **lsp:** improve symantic highlighting ([3968e07](https://github.com/likec4/likec4/commit/3968e07bca2f578800d476c102ad216d11111e7d))
* **playground:** persistent workspace ([911c632](https://github.com/likec4/likec4/commit/911c63273a7bf0284dcce2e0aa7df22e0e39035b))

### Bug Fixes

* **deps:** upgrade langium to 3.1.0 ([a309316](https://github.com/likec4/likec4/commit/a309316834c5b5ede51e2812d2f1a0d88d4f471a))
* **diagram:** rendering performance ([2eef48b](https://github.com/likec4/likec4/commit/2eef48bed6192e32f312a709bd591a3b179f2b39))
* **diagram:** responsive dynamic view ([ad03301](https://github.com/likec4/likec4/commit/ad03301a2d0a10ae9742f00d451c0cf89b010e73))
* **lsp:** 0% opacity in specification ([bbec0a8](https://github.com/likec4/likec4/commit/bbec0a84b1e8411c6ee4c9a8efb1f0d4fbf70920))


## [1.2.2](https://github.com/likec4/likec4/compare/v1.2.1...v1.2.2) (2024-06-14)

1.2.1 did not fix [#765](https://github.com/likec4/likec4/issues/765) 

## [1.2.1](https://github.com/likec4/likec4/compare/v1.2.0...v1.2.1) (2024-06-14)


### Bug Fixes

* **cli:** compatibility with vite 5.3 (closes [#765](https://github.com/likec4/likec4/issues/765), thanks to [@simonwfarrow](https://github.com/simonwfarrow))
* **deps:** playwright 1.44.1 ([3f277f7](https://github.com/likec4/likec4/commit/3f277f71cbd5cf4b3a31ea515c6f475bab20ab4d))



# [1.2.0](https://github.com/likec4/likec4/compare/v1.1.1...v1.2.0) (2024-06-12)

### 🚀 Features  

**Dynamic Views [Experimental]**  

  Describe a particular use-case or scenario, with ad-hoc interactions (without polluting the model).

  ```zig
  dynamic view example {
    title 'Dynamic View Example'
    customer -> web 'opens in browser'
    web -> api 'POST request'
    web <- api 'returns JSON'
  }
  ```

  Check [example](https://docs.likec4.dev/dsl/dynamic-views/)

### Bug Fixes

* **diagram:** always zoom to 1.0 on container resize ([f5b898c](https://github.com/likec4/likec4/commit/f5b898c01f90212cb4e171530e8e6142cb27c076))
* **diagram:** backdrop in safari ([94530ae](https://github.com/likec4/likec4/commit/94530ae4fe2da710337512c11a616698b06f2bdb))
* **diagram:** focus in dynamic walkthrough ([b4c1752](https://github.com/likec4/likec4/commit/b4c1752aed96049b2605ffcabc8812762c363fa9))
* **playground:** missing element type ([4aad466](https://github.com/likec4/likec4/commit/4aad4668885b0b6f88825a7fe58704b8dcf39401))
* **playground:** unique extension for each playground ([8fcfed6](https://github.com/likec4/likec4/commit/8fcfed6d8e26d43d3da5306d0985501696d2c516))


## [1.1.1](https://github.com/likec4/likec4/compare/v1.1.0...v1.1.1) (2024-05-26)

### Bug Fixes
* **diagram:** viewport transform is not rounded to integers which results in blurry nodes on some resolution ([d268344](https://github.com/likec4/likec4/commit/d268344e40c9da45fc38fcbc00451ed69c089160)), closes [#734](https://github.com/likec4/likec4/issues/734)

### Improvements

* change opacity and border style from ui ([f69dbb4](https://github.com/likec4/likec4/commit/f69dbb439a726fe691e98a65911730067fbb752c))
* diagram title panel ([#741](https://github.com/likec4/likec4/issues/741)) ([1342be4](https://github.com/likec4/likec4/commit/1342be4aee07f3256a2cb2063a6df08f15d387a2))

# [1.1.0](https://github.com/likec4/likec4/compare/v1.0.2...v1.1.0) (2024-05-24)


### Features

* Change opacity and border for compounds background ([#723](https://github.com/likec4/likec4/issues/723))

  ```zig
  view {
     include some._
  
     style some {
       opacity 20%
       border dashed
     }
  
  }
  ```

### Bug Fixes

* **app:** color scheme inheritance ([70b5243](https://github.com/likec4/likec4/commit/70b52439b83ac2644b1393cf150411f4d5e3f38f))
* **playground:** show locations ([6af55a6](https://github.com/likec4/likec4/commit/6af55a6c729fad157c13f26c948a2bf7a035e41f))


## [1.0.2](https://github.com/likec4/likec4/compare/v1.0.1...v1.0.2) (2024-05-21)

### Bug Fixes

* **vscode:** preview fails with command `likec4:open-preview` not found ([#724](https://github.com/likec4/likec4/issues/724), thanks [@4cio](https://github.com/4cio))
* **deps:** update dependency playwright to v1.44.0 ([#713](https://github.com/likec4/likec4/issues/713)) ([dd62f8d](https://github.com/likec4/likec4/commit/dd62f8da8207fe8619ddcdaa4c13fe0dfca72c17))
* **vscode:** bundling `@hpcc-js/wasm` is necessary for the extension to work properly ([6904afc](https://github.com/likec4/likec4/commit/6904afc4eb950b1255440e92b759d1d05351bd4d))

## [1.0.1](https://github.com/likec4/likec4/compare/v1.0.0...v1.0.1) (2024-05-18)


### Bug Fixes

* **lsp:** correct selection range after changes ([42999ef](https://github.com/likec4/likec4/commit/42999efb804e1f70d8352b541c5264bfefc06f5b))
* **vscode:** correct view column for preview ([6a33a48](https://github.com/likec4/likec4/commit/6a33a4834c47850644a41d304568c8007bc68d34))

### Minor

* download view as png from app ([b316dfb](https://github.com/likec4/likec4/commit/b316dfb6e3f187f8b0211788b5ab4f08e50a0abf))



# [1.0.0](https://github.com/likec4/likec4/compare/v1.0.0-rc.1...v1.0.0) (2024-05-17)

### 🚀 Features  

- **View Editor**  
  VSCode Preview allows to change color, shape and switch auto-layout.  
  Changes are persistent and update sources.
  
  Also available in preview (via CLI), but changes are not saved back.

- **LikeC4 views as webcomponents**
  Generates JS with custom elements:

  ```html
    <script src="https://published.website/likec4-views.js"></script>
    <likec4-view view-id="index"></likec4-view>    
  ```

  Always generated on `likec4 build`, but also available as `likec4 gen webcomponent` 

- **New predicate `include some._`**  
  Expand and include nested elements only if they have in/out relationships (internals are not considered):
  ```zig
  view {
     include some._
  }
  ```

  Differs from `include some.*`, which includes all nested elements regardless of relationships.

  _Almost the same as_:

  ```zig
  view {
    include some
    include -> some.* ->
    exclude some.* -> some.*
  }
  ```
  
- **New predicate `<->`**  
  Include relationships of both directions between elements:
  ```zig
  view {
     include someA.* <-> someB.*
  }
  ```

- **CLI**  
  Builds and exports with pre-bundled CLI are 6-8x times faster  
  Allow deep-linking in GitHub Pages, closes [#661](https://github.com/likec4/likec4/issues/661)  
  Set color-scheme on export to png, closes [#685](https://github.com/likec4/likec4/issues/685)  

- **New renderer**  
  Fast and responsive views on any device, based on [xyflow](https://www.xyflow.com/)
  
- **New sites**  
  https://docs.likec4.dev/ - (migration in progress...)  
  https://playground.likec4.dev/ - dedicated for playgrounds

# [1.0.0-rc.1](https://github.com/likec4/likec4/compare/v1.0.0-next.14...v1.0.0-rc.1) (2024-05-06)

### 🚀 Features  

- **LikeC4 views as webcomponents**     
  Generates JS with custom elements:

  ```html
    <script src="https://published.website/likec4-views.js"></script>
    <likec4-view view-id="index"></likec4-view>    
  ```

  Always generated on `likec4 build`, but also available as `likec4 gen webcomponent` 

- **New predicate `include some._`**  
  Expand and include nested elements only if they have in/out relationships (internals are not considered):
  ```zig
  view {
     include some._
  }
  ```

  Differs from `include some.*`, which includes all nested elements regardless of relationships.

  _Almost the same as_:

  ```zig
  view {
    include some
    include -> some.* ->
    exclude some.* -> some.*
  }
  ```
  
- **New predicate `<->`**  
  Include relationships of both directions between elements:
  ```zig
  view {
     include someA.* <-> someB.*
  }
  ```

- **Pre-bundled CLI**  
  Builds and exports are 6-8x times faster  

- **New renderer**  
  Fast and responsive views on any device, based on [xyflow](https://www.xyflow.com/)

- **Editor**  
  VSCode Preview allows to change color, shape and switch auto-layout.  
  Changes are persistent and update sources.
  
  Also available in preview (via CLI), but changes are not saved back.

### In Progress

- Editor: manual layout
- New docs


# [1.0.0-next.14](https://github.com/likec4/likec4/compare/v0.60.4...v1.0.0-next.14) (2024-04-30)

PRE-RELEASE

# [1.0.0-next.11](https://github.com/likec4/likec4/compare/v1.0.0-next.10...v1.0.0-next.11) (2024-04-11)

PRE-RELEASE

### Features

* webcomponents ([df430f0](https://github.com/likec4/likec4/commit/df430f0971b4d3c59e00cd560275d1b8601e0bb9))

# [1.0.0-next.10](https://github.com/likec4/likec4/compare/v1.0.0-next.2...v1.0.0-next.10) (2024-04-02)

Working on pre-release

# [1.0.0-next.2](https://github.com/likec4/likec4/compare/v1.0.0-next.1...v1.0.0-next.2) (2024-03-31)

Working on pre-release

# [1.0.0-next.1](https://github.com/likec4/likec4/compare/v1.0.0-next.0...v1.0.0-next.1) (2024-03-29)

Working on pre-release

# [1.0.0-next.0](https://github.com/likec4/likec4/compare/v0.60.3...v1.0.0-next.0) (2024-03-29)

Working on pre-release

## [0.60.4](https://github.com/likec4/likec4/compare/v0.60.3...v0.60.4) (2024-04-13)

### Bug Fixes

- **diagrams:** Icons do not render when expected in React app, see [#649](https://github.com/likec4/likec4/issues/649)
- **deps**: update dependencies

## [0.60.3](https://github.com/likec4/likec4/compare/v0.60.2...v0.60.3) (2024-03-28)

### Bug Fixes

- **layout:** "fake" a node icon with a blue square to preserve space for real icons, see [#577](https://github.com/likec4/likec4/issues/577) ([23b0881](https://github.com/likec4/likec4/commit/23b088140d374ab4eec9eb38edbf76c392897e7e))

## [0.60.2](https://github.com/likec4/likec4/compare/v0.60.1...v0.60.2) (2024-03-26)

[@mcpride](https://github.com/mcpride) reported that `likec4 export png ...` timed out _sometimes_ (see [#634](https://github.com/likec4/likec4/issues/634))

As a temporary workaround, now cli has the option to configure max attempts (retries) and set timeout. Or even ignore failures,

```
Options:
  -i, --ignore        continue if some views failed to export                            [boolean] [default: false]
  -t, --timeout       (ms) timeout for playwright operations                              [number] [default: 15000]
      --max-attempts  (number) if export failed, retry N times                                [number] [default: 4]
```

Example:

```sh
$ likec4 export png -o ./assets -i --max-attempts 3 -t 5000
```

LikeC4 sets default playwright timeout to 5sec, retries exporting failed views 3 times, and ignores these failures anyway (if there are any successful exports).

## [0.60.1](https://github.com/likec4/likec4/compare/v0.60.0...v0.60.1) (2024-03-22)

### Bug Fixes

- **cli:** `-v` returns undefined [#615](https://github.com/likec4/likec4/issues/615)
- **cli:** reuse playwright page for screenshots ([#635](https://github.com/likec4/likec4/issues/635)) ([f07c61b](https://github.com/likec4/likec4/commit/f07c61bf7fa693f931f4ff88725f73e17aa553f4)), closes [#634](https://github.com/likec4/likec4/issues/634),
- **deps:** update dependency playwright-core to v1.42.1 ([#636](https://github.com/likec4/likec4/issues/636)) ([48d7ef4](https://github.com/likec4/likec4/commit/48d7ef4874254cfb7929517f73bf4d2d256677df))

# [0.60.0](https://github.com/likec4/likec4/compare/v0.58.0...v0.60.0) (2024-03-10)

### 🚀 Features

- **Relations with container elements** [#530](https://github.com/likec4/likec4/issues/530)\
  Relations with container elements were always used to layout diagrams but were not shown as they sometimes looked quite weird.
  While solving [#614](https://github.com/likec4/likec4/issues/614) it was figured out:
  - Sometimes, Graphviz fails to ["group"](https://graphviz.org/docs/attrs/group/) more than 5 nodes (or some extra heuristics required)
  - Relations with containers look much better without hard [minlen](https://graphviz.org/docs/attrs/minlen/)
  - Results from Graphviz WASM and its binary version can be significantly different

> Compare results by starting two CLIs (with and without `--use-dot-bin`)

### Bug Fixes

- decrease the number of nodes to group 7 -> 5, closes [#614](https://github.com/likec4/likec4/issues/614)

# [0.58.0](https://github.com/likec4/likec4/compare/v0.57.1...v0.58.0) (2024-03-08)

### 🚀 Features

- **lsp:** add links to relationships ([#616](https://github.com/likec4/likec4/issues/616)) ([5f94ac3](https://github.com/likec4/likec4/commit/5f94ac3057c426e5d255bcc76cf10763702b669f)), closes [#612](https://github.com/likec4/likec4/issues/612)
- **lsp:** langium 3 ([#606](https://github.com/likec4/likec4/issues/606)) ([b12605d](https://github.com/likec4/likec4/commit/b12605dbd2c4037b939f0aba86ff5c57ca4d4777))

## [0.57.1](https://github.com/likec4/likec4/compare/v0.57.0...v0.57.1) (2024-02-23)

### Bug Fixes

- **cli:** fix build ([d750521](https://github.com/likec4/likec4/commit/d75052171fa81bb87fa920e4f2f4c7fc274d6f1a))

# [0.57.0](https://github.com/likec4/likec4/compare/v0.56.0...v0.57.0) (2024-02-23)

### 🚀 Features

- **cli:** add option to use graphviz binary (instead of bundled WASM) [#534](https://github.com/likec4/likec4/issues/534) ([205e334](https://github.com/likec4/likec4/commit/205e334d090595eac3f248660eeb1a56a1d1d307))

### Bug Fixes

- **cli:** tsx default tsconfig ([2f5b3f0](https://github.com/likec4/likec4/commit/2f5b3f00873bfa395651c1dba4fdc47d81a096a6))
- **lsp:** returns references to the same views if no changes are made ([56333e1](https://github.com/likec4/likec4/commit/56333e1e357bd37e77aaf25519ff3d86288c2a0d))
- **vscode:** use browser and node `startServer` from `@likec4/language-server` ([67e3bab](https://github.com/likec4/likec4/commit/67e3bab0431e9011e198cfd81af7c110a821b47c))

# [0.56.0](https://github.com/likec4/likec4/compare/v0.54.0...v0.56.0) (2024-02-17)

### Features

- **vscode:** setting to use local graphviz binaries (see [#534](https://github.com/likec4/likec4/issues/534) [7e93e86](https://github.com/likec4/likec4/commit/7e93e86b3406f86da48d8d302805a69a16c1a31e))

### Bug Fixes

- **core:** improve error stack trace ([06ebf81](https://github.com/likec4/likec4/commit/06ebf81806d9386ba88fde8b829b162b81ca4d9d))
- **deps:** update dependency @hpcc-js/wasm to ^2.15.3 ([#537](https://github.com/likec4/likec4/issues/537)) ([b2fc368](https://github.com/likec4/likec4/commit/b2fc368ab08c51bf1d8493a31b8f6db3957d5687))
- **deps:** update dependency @radix-ui/themes to ^2.0.3 ([#544](https://github.com/likec4/likec4/issues/544)) ([c0929a1](https://github.com/likec4/likec4/commit/c0929a1b9a6e46546ff9e9bc69bddbf2124e23bb))
- **deps:** update dependency autoprefixer to ^10.4.17 ([#561](https://github.com/likec4/likec4/issues/561)) ([56f462f](https://github.com/likec4/likec4/commit/56f462f52f986771341c27a05b63fe10676c2970))
- **deps:** update dependency jotai to ^2.6.4 ([#545](https://github.com/likec4/likec4/issues/545)) ([1f97776](https://github.com/likec4/likec4/commit/1f977764269bc4c87ca49795a92cc387260abfb5))
- **deps:** update dependency konva to ^9.3.2 ([#546](https://github.com/likec4/likec4/issues/546)) ([469c3bc](https://github.com/likec4/likec4/commit/469c3bc9f87faef0b4649f9f710677efce97367c))
- **deps:** update dependency konva to ^9.3.3 ([58db259](https://github.com/likec4/likec4/commit/58db25940db0183d125e47623a76cf4b32b0e7b3))
- **deps:** update dependency react-accessible-treeview to ^2.8.3 ([#556](https://github.com/likec4/likec4/issues/556)) ([919aede](https://github.com/likec4/likec4/commit/919aeded60b9b2382793c1adfe9b61cb04bdb1d3))
- **deps:** update dependency remeda to ^1.40.0 ([#555](https://github.com/likec4/likec4/issues/555)) ([a5797f6](https://github.com/likec4/likec4/commit/a5797f6259c46521d359460a929467694738956b))
- **deps:** update dependency remeda to ^1.40.1 ([#559](https://github.com/likec4/likec4/issues/559)) ([8815004](https://github.com/likec4/likec4/commit/8815004190e73073addf942365a770222050d9a9))
- **deps:** update dependency ts-graphviz to ^1.8.2 ([ea80d34](https://github.com/likec4/likec4/commit/ea80d34db2ad209188170243b0909f4b6d4ed177))
- **deps:** update playwright to 1.41.2 ([18416f1](https://github.com/likec4/likec4/commit/18416f1369643b827e01295e3583bdbc82ba1d3b))

# [0.55.0]

Skipped due manual (and erroneous) publishing to marketplace.

# [0.54.0](https://github.com/likec4/likec4/compare/v0.53.0...v0.54.0) (2024-01-12)

### 🚀 Features

- **lsp:** add tags to relationships ([a7e6e06](https://github.com/likec4/likec4/commit/a7e6e065759ede641dd40b9cb3d49630666bcd79))

### Bug Fixes

- **vscode:** document selector on windows ([2540f88](https://github.com/likec4/likec4/commit/2540f88094eb3b7ee620712611e7deffb545af78))

# [0.53.0](https://github.com/likec4/likec4/compare/v0.52.0...v0.53.0) (2024-01-10)

### Features

- **diagrams:** element links [#525](https://github.com/likec4/likec4/issues/525) ([bed13b5](https://github.com/likec4/likec4/commit/bed13b54463cc4e2b66a3a644a05709e0b8ff38c))
- **lsp:** DocumentHighlightProvider ([62d31b3](https://github.com/likec4/likec4/commit/62d31b3b97fc3490e7ada7dc6702d93575eca8ee))

### Fixes

- **cli:** add fs watcher inside plugin on server configuration ([73f4263](https://github.com/likec4/likec4/commit/73f4263bb185167c0ebf73609794904a77a1b1f2))
- **cli:** d2 view fails to load ([5f7690f](https://github.com/likec4/likec4/commit/5f7690fef6393df4752e3e91c21eb43bee23edd5))
- **diagrams:** minor ui improvements ([2f38eb4](https://github.com/likec4/likec4/commit/2f38eb448a5e9c6269b06b499a0d6bb3f13febde))
- **layout:** add `headArrowPoint` and `tailArrowPoint` to edges ([89a9171](https://github.com/likec4/likec4/commit/89a91711bab7c57ffb183cd5e784efdda72543b9))
- **layouts:** ts compile error and remove dead code ([667bc00](https://github.com/likec4/likec4/commit/667bc000447640b5254d9be43f3ea5bca9a8d4fb))
- **layout:** use `constraint=false` instead of `minlen=0` ([1fdc6ba](https://github.com/likec4/likec4/commit/1fdc6ba4b91766a96827beee6f92422612371f10))
- **types:** `NonEmptyArray` has defined either head or tail ([dccc52a](https://github.com/likec4/likec4/commit/dccc52a131ad4ddf29b0d09cd35661edf03c129c))

# [0.52.0](https://github.com/likec4/likec4/compare/v0.51.0...v0.52.0) (2023-12-12)

- **likec4:** preview mermaid and d2 ([02f0be2](https://github.com/likec4/likec4/commit/02f0be2cfbe79331e9db0d41352b522d1bb78e24))
- **likec4:** improve graphviz output ([954e7d0](https://github.com/likec4/likec4/commit/954e7d0ed7f0714b08f98f0a56d073f39edf1dbb))

### Bug Fixes

- **deps:** bump `@hpcc-js/wasm` to 2.15.1 ([8e51156](https://github.com/likec4/likec4/commit/8e5115685beb889dbfdf91e754ae9282f837111a))
- **graph:** remove implicit edges if there is any nested already included ([94f935f](https://github.com/likec4/likec4/commit/94f935fc38a473315eb9d8891ea9ceee26ef45f7))
- **graph:** sort graph nodes ([3c8adf7](https://github.com/likec4/likec4/commit/3c8adf779c6dc5229bca51ce1ff27b6377085890))
- **layout:** edges with reverse direction ([09edfb8](https://github.com/likec4/likec4/commit/09edfb8be5842ef28414a47b0cea9ad748b96e2d))
- **layouts:** don't use `weight` edges in graphviz layout ([60917eb](https://github.com/likec4/likec4/commit/60917eb301fc65c86c4cabee50e9689d91edf4f6))

# [0.51.0](https://github.com/likec4/likec4/compare/v0.50.0...v0.51.0) (2023-12-05)

### 🚀 Features

- **language-server:** tolerant parser, exclude only erroneous elements (previously ignored whole document) ([2c9c456](https://github.com/likec4/likec4/commit/2c9c456fff57a54a811b0e86d3e5f11aa148685b))

### Bug Fixes

- **graph:** improve compound layouts ([feec3b3](https://github.com/likec4/likec4/commit/feec3b38d4714ddfe89a5be50a445f9859a99af9))
- **graph:** correct relationship predicate ([eba2be6](https://github.com/likec4/likec4/commit/eba2be6523fee49931000548fba679453df05931))
- **generators:** indent in mermaid ([6d27249](https://github.com/likec4/likec4/commit/6d272498ba0ac8cf19e16e3facf069266fac1ce8))
- **deps:** bump `vitest` to 1.0.1 ([0666acd](https://github.com/likec4/likec4/commit/0666acd7d386a25326cba17940d7299058fa5457))
- **deps:** update dependency jotai to ^2.6.0 ([62e46f2](https://github.com/likec4/likec4/commit/62e46f2d3d602591354d1be19b022b20eb4c1fec))

# [0.50.0](https://github.com/likec4/likec4/compare/v0.49.0...v0.50.0) (2023-12-01)

### 🚀 Features

- **diagrams:** navigate button ([44d2182](https://github.com/likec4/likec4/commit/44d218257916a449ce0e3ce2a039a0e460196d6a))
- **likec4:** display other formats ([c2f5823](https://github.com/likec4/likec4/commit/c2f5823e378cca00e16e548e10db53b133a768a0))
- **likec4:** copy-to-clipboard button ([ee444ac](https://github.com/likec4/likec4/commit/ee444ac1fd6f7f6ad937bf58182a12862aecb0f9))
- **likec4:** display diagram links ([c4932e7](https://github.com/likec4/likec4/commit/c4932e763a446dd9a426a08c62be28dfee07308e))
- **likec4:** show overlay on validation error ([6f1c36f](https://github.com/likec4/likec4/commit/6f1c36f57d3097726cbe1fdc06d59eb98b9d12ad))

### Bug Fixes

- **layouts:** background color for compounds in dot ([773c1ae](https://github.com/likec4/likec4/commit/773c1ae7dc83d8341c84f0fe1cb26682e6e5a3e7))
- **deps:** update dependency type-fest to ^4.8.2 ([75c54fa](https://github.com/likec4/likec4/commit/75c54faf37e8c4e33808336420f3cd0cea5c8b7a))
- **docs:** show correct dot in playground ([9e20da9](https://github.com/likec4/likec4/commit/9e20da9e2d1e1f37f14325f79e198dc3ba2ded76))
- **graph:** sort graph nodes considering implicit edges ([a1e33a4](https://github.com/likec4/likec4/commit/a1e33a4b9a7a52ccf2e8e97bb0c01a8bf06f4b6f))
- **layouts:** improve graph layout ([e71abfe](https://github.com/likec4/likec4/commit/e71abfe923febad88e190a66e8aced13a559bba6))
- **graph:** removeRedundantImplicitEdges ([a6420dc](https://github.com/likec4/likec4/commit/a6420dca92dc3ceea079b12ee4cab1711b841757))

# [0.49.0](https://github.com/likec4/likec4/compare/v0.48.0...v0.49.0) (2023-11-23)

### 🚀 Features

- **cli:** export to JSON ([f7a5db7](https://github.com/likec4/likec4/commit/f7a5db74ad0641b051ee4a058cd11b747436a88a))

### Bug Fixes

- **codegen:** incorrect dot is generated ([fddade6](https://github.com/likec4/likec4/commit/fddade65f494f6e7ebcd45720c886de261e258ed))
- **vscode:** extension lifecycle (correct "dispose") ([ecedcd6](https://github.com/likec4/likec4/commit/ecedcd6cb608347309f6a045b55f6c13db35106e))

# [0.48.0](https://github.com/likec4/likec4/compare/v0.47.0...v0.48.0) (2023-11-21)

### Bug Fixes

- **deps:** update dependency playwright-core to ^1.40.0 ([#466](https://github.com/likec4/likec4/issues/466)) ([ac979d4](https://github.com/likec4/likec4/commit/ac979d4492bfbfc16ce86623fd5acee2626a3a26))
- **likec4:** import statements and error handling in code ([efb0797](https://github.com/likec4/likec4/commit/efb07970c6e254e0f66a32245ba95d73ce5e0039))
- **lsp:** semantic tokens overlap ([f4b9c00](https://github.com/likec4/likec4/commit/f4b9c0018975d79264c7171bfaff7bd5a8769b9c))
- **vscode:** init workspace for web ([88b043d](https://github.com/likec4/likec4/commit/88b043d10738bbcae11f21d443dc880d079355d2))

# [0.47.0](https://github.com/likec4/likec4/compare/v0.46.1...v0.47.0) (2023-11-18)

Custom navigation and links between views:

```
view view2 {
  include *
  include cloud.backend with {
    // navigate to 'view3' on click
    navigateTo view3
  }
}

view view3 {
  include *
  include cloud.backend with {
    // the same element, but navigate back to 'view2'
    navigateTo view2
  }
}
```

### 🚀 Features

- **lsp:** custom navigation ([dc428ee](https://github.com/likec4/likec4/commit/dc428eefda8959aea99f2725900e9d922a0ea7a8))
- **vscode:** add WorkspaceSymbolProvider ([f333a24](https://github.com/likec4/likec4/commit/f333a24418c931c43fb7dfe75a97dbac7248acf7))

### Bug Fixes

- **cli:** output version ([4e06953](https://github.com/likec4/likec4/commit/4e06953ee10734850d9e73965294162e4240dd36))
- **deps:** update dependency @radix-ui/themes to ^2.0.1 ([8c6802f](https://github.com/likec4/likec4/commit/8c6802f62465774a174ba2e4bad1701513b0a835))
- **deps:** update dependency jotai to ^2.5.1 ([4bb2362](https://github.com/likec4/likec4/commit/4bb2362e320f545ece5e8d20072f2d0e0e383a31))
- **deps:** update dependency nanostores to ^0.9.5 ([748554c](https://github.com/likec4/likec4/commit/748554caa4dc3b290ce6d9fb1d032dd01a276a13))
- **deps:** update dependency type-fest to ^4.7.1 ([cadebe0](https://github.com/likec4/likec4/commit/cadebe0ebd46589671f0ba23cb9d7ba97877a625))
- **layouts:** improve edge weights ([21f55cb](https://github.com/likec4/likec4/commit/21f55cb2b3ac8afbce5acca1c83c8e485ba60e63))
- **layouts:** set `minlen=0`instead of `constraint=false` for better layout ([ccad492](https://github.com/likec4/likec4/commit/ccad492688b6d41342b0f4de46202086adfb850a))
- **lsp:** allow reserved words as ID ([12636d5](https://github.com/likec4/likec4/commit/12636d5d14cc65edfb2ba70de0aa5caa96477435))
- **lsp:** make extended element resolvable inside its body ([6c3b009](https://github.com/likec4/likec4/commit/6c3b009d762bcd04f253f138f030089b8850be2a))

## [0.46.1](https://github.com/likec4/likec4/compare/v0.46.0...v0.46.1) (2023-11-14)

### Bug Fixes

- **cli:** return optimizeDeps in serve ([d8e065f](https://github.com/likec4/likec4/commit/d8e065fc05cafaa703061a7e3224ed6b1ef19ed7))

# [0.46.0](https://github.com/likec4/likec4/compare/v0.45.0...v0.46.0) (2023-11-11)

With the Langium update to version 2.1.2, the code completions in VSCode have significantly improved.

### 🚀 Features

- **core:** add depth field to compound nodes ([fe3083a](https://github.com/likec4/likec4/commit/fe3083acadd0da82d947a61f3ff6cc1997eaa1aa))
- **diagrams:** backgroung pattern ([c2bc83b](https://github.com/likec4/likec4/commit/c2bc83b0ead78e16812f2174c7ea9cbf0f5888eb))
- **graph:** sorting of relationships ([bd8d694](https://github.com/likec4/likec4/commit/bd8d694bbb7f5100efe90d432133898815ce93a4))
- **lsp:** any order of top-level statements ([#445](https://github.com/likec4/likec4/issues/445)) ([154844c](https://github.com/likec4/likec4/commit/154844c8ceb1317cba3950b2030cab3abea008c5))
- **vscode:** display error message on failed parse ([789958f](https://github.com/likec4/likec4/commit/789958f72585f4e3e3fa6e2339fef67be4c0df5e))

### Bug Fixes

- **core:** hierarchical sorting of relationships ([6325e0e](https://github.com/likec4/likec4/commit/6325e0ee7b79adff69bef9739aaf3c22128d85d1))
- **deps:** update dependency remeda to ^1.29.0 ([1ec9348](https://github.com/likec4/likec4/commit/1ec9348271e53a847c03079f7f6234a947db2b25))
- **deps:** update langium to 2.1.2 ([#423](https://github.com/likec4/likec4/issues/423)) ([ba17f44](https://github.com/likec4/likec4/commit/ba17f44bfcfa19fb46909193b7e31de2dda62025))
- **graph:** do not add element if it exists implicitly ([27b5d7d](https://github.com/likec4/likec4/commit/27b5d7d5e24aeb38fd7c75f5f9e4663979fa204c))
- **graph:** left-align for edge labels ([7e7dea8](https://github.com/likec4/likec4/commit/7e7dea82cdcad779315a4caf89e4b4393fb9c95f))
- **likec4:** improve transparent background for emded ([174f296](https://github.com/likec4/likec4/commit/174f296f11055aa1f50d0099b54dec75daeca7e2))
- **lsp:** onBuildPhase should be in async context ([2a7f0cb](https://github.com/likec4/likec4/commit/2a7f0cb98c48324429fe9d2e21198d2cfb566412))

# [0.45.0](https://github.com/likec4/likec4/compare/v0.44.1...v0.45.0) (2023-11-04)

### 🚀 Features

- **likec4:** dedicated page for export with transparent background ([e992144](https://github.com/likec4/likec4/commit/e9921449e5b1c9011b32e438244325c97c3edb78))

### Bug Fixes

- **likec4:** don't emptyOutDir on second run ([9d58f39](https://github.com/likec4/likec4/commit/9d58f39e9a07ec1ab005a78fb9d9c4445f004bc9))
- **diagrams:** absolute position for FullscreenDiagram ([29741f1](https://github.com/likec4/likec4/commit/29741f1139d44cdaaf77e78adbce736a5eaa1504))
- **diagrams:** adjust label positions ([afdad65](https://github.com/likec4/likec4/commit/afdad654ce506fda9fffa3d2f16edf15964ce067))
- **diagrams:** correct node label positions ([500f53d](https://github.com/likec4/likec4/commit/500f53d8c237540400a0dc1ea2ba32fd526a38a5))
- **diagrams:** smooth animation ([ad054ce](https://github.com/likec4/likec4/commit/ad054cee07b18f9ff6d905a74a44218fec8130e6))
- **docs:** css classes for embedded diagram ([9a0418a](https://github.com/likec4/likec4/commit/9a0418a756f3fd52900deb526e28ca4f68f8cbfe))
- **layouts:** strict align for node and edge labels ([813fd10](https://github.com/likec4/likec4/commit/813fd10bccd46ebc2d9d39686396349ca7897619))
- **vscode:** git changes were parsed too, that led to duplicate entries ([04d1a7f](https://github.com/likec4/likec4/commit/04d1a7fe4ca9dff2be2fb27f3b214495b5bdb1cc))

## [0.44.1](https://github.com/likec4/likec4/compare/v0.44.0...v0.44.1) (2023-11-02)

### Bug Fixes

- **cli:** vite ports and export output ([36e0f68](https://github.com/likec4/likec4/commit/36e0f68648c0b6f02c6de4e2450d023181305f67))
- **deps:** update dependency konva to ^9.2.3 ([b02301b](https://github.com/likec4/likec4/commit/b02301b106432148aba558e2d4a8396d278968d8))

# [0.44.0](https://github.com/likec4/likec4/compare/v0.43.1...v0.44.0) (2023-10-30)

### Features

- **diagrams:** add icon to elements to indicate they include a sub-view [#361](https://github.com/likec4/likec4/issues/361) ([8fd1a2e](https://github.com/likec4/likec4/commit/8fd1a2eb708bd5597954237f2979c056df831ee6))

## [0.43.1](https://github.com/likec4/likec4/compare/v0.43.0...v0.43.1) (2023-10-29)

### Bug Fixes

- **diagrams:** better timing for edge onhover ([2dec801](https://github.com/likec4/likec4/commit/2dec8013a256293fbc565365eaebe94908fcf2d0))
- **vscode:** do not fail if source file was removed ([96e15ff](https://github.com/likec4/likec4/commit/96e15ffcd85a320c316e527bd9a3b6b37b9d7e0c))

# [0.43.0](https://github.com/likec4/likec4/compare/v0.42.2...v0.43.0) (2023-10-29)

### 🚀 Features

- **diagrams:** highlight elements of the hovered edge ([7e65b0e](https://github.com/likec4/likec4/commit/7e65b0e3ab60ad96e55584b2326fed7a1f51b3e6))

### Bug Fixes

- **language:** add validation for incoming and outgoing expressions ([b31c1f1](https://github.com/likec4/likec4/commit/b31c1f1a520937048929a0fa5c8163240dc2be6f))

## [0.42.2](https://github.com/likec4/likec4/compare/v0.42.1...v0.42.2) (2023-10-28)

### Bug Fixes

- **graph:** handle `-> .. ->` expressions ([c7fb33e](https://github.com/likec4/likec4/commit/c7fb33ed3daefcbea95b3c4db21e0b46cd4fe81a))
- **layouts:** `haveNoOtherEdges` condition should be only for root ([095c4ac](https://github.com/likec4/likec4/commit/095c4ac3e0f97ad6debf3cb2426d0ceda3792b28))

## [0.42.1](https://github.com/likec4/likec4/compare/v0.42.0...v0.42.1) (2023-10-26)

### Bug Fixes

- **cli:** wrong vite entrypoint when embeded ([4f43536](https://github.com/likec4/likec4/commit/4f435361f2ce45e44262cadc5f4b577f92081362))

# [0.42.0](https://github.com/likec4/likec4/compare/v0.41.0...v0.42.0) (2023-10-26)

### 🚀 Features

- **cli:** export to PNG from preview ([6996184](https://github.com/likec4/likec4/commit/6996184859003fb0c67f02d22ba0e3b86029738a))

# [0.41.0](https://github.com/likec4/likec4/compare/v0.40.0...v0.41.0) (2023-10-25)

### 🚀 Features

- **diagrams:** relationship kinds by @MoBoo ([#342](https://github.com/likec4/likec4/issues/342))\
  [Docs](https://likec4.dev/docs/dsl/specification/#relationships)

  Relationship kinds allow you to express different types of relations in a model and customize styling.

  Example:

  ```
  specification {
    relationship async {
      color amber
      line dotted
      head diamond
    }
  }
  model {
    service1 -[async]-> service2
  }
  ```

- **cli:** new CLI and preview mode

  Try this in folder with your `*.c4` files

  ```bash
  npx likec4 serve
  ```

  Documentation is updating... 👷

- **cli:** export to static website

  ```bash
  npx likec4 build -o dist
  ```

- **cli:** Scaffold projects with `npm create likec4` ([ef7cf93](https://github.com/likec4/likec4/commit/ef7cf93bbb7a397a2685b7952b4a8c601656ab81))
- **diagrams:** dashed relationships by default ([3593d71](https://github.com/likec4/likec4/commit/3593d71a143720615f8783a587978dea250be24f))

### Bug Fixes

- **diagrams:** don't animate element if animation is disabled ([b039602](https://github.com/likec4/likec4/commit/b03960204963a04ba4badbacc6ea780709b81801))
- **likec4:** responsive embeds ([c8b187d](https://github.com/likec4/likec4/commit/c8b187d4207fb84312c14360e9839f3c626da3c1))
- **likec4:** use deviceScaleFactor = 2 ([ad8099a](https://github.com/likec4/likec4/commit/ad8099af1a31b3fd59c8fe3ec3833ba1b259daba))
- **likec4:** use window size for export/embed ([a0b3d6b](https://github.com/likec4/likec4/commit/a0b3d6bea49b18878aa684f1a833849e84a472e5))
- remove redundant implicit edges ([4a8daaf](https://github.com/likec4/likec4/commit/4a8daaf00444275506659a86922a32037d7ff9a6))
- use [...] for merged edges ([81282e6](https://github.com/likec4/likec4/commit/81282e698c36b964c80e9439138f2db54b8e3c05))
- vscode launch task loads source maps ([c867401](https://github.com/likec4/likec4/commit/c867401f8535654e7701664d669d0d18f9d2bd9f))

### New Contributors

@MoBoo made their first contribution in #374

# [0.40.0](https://github.com/likec4/likec4/compare/v0.37.1...v0.40.0) (2023-10-09)

### Features

- `diagrams-dev` workspace ([fc5560f](https://github.com/likec4/likec4/commit/fc5560faf56e9c53e4f08378a2e29712aac90fff))
- new cli `likec4` ([9413cec](https://github.com/likec4/likec4/commit/9413cecbc94087f7dfd136ea4d80704af965c3e5))

### Bug Fixes

- **diagrams:** fix zoom ([02ba48d](https://github.com/likec4/likec4/commit/02ba48d2a4e51f39ef0956abc9379cd48436791c))
- **language:** resolve view links ([9d1a0ca](https://github.com/likec4/likec4/commit/9d1a0ca9dcb1ce6b1749f4964a64383ed6a3a923))

## [0.37.1](https://github.com/likec4/likec4/compare/v0.37.0...v0.37.1) (2023-09-16)

### Features

- **vscode:** "Open source" from element context menu in preview panel ([8b19661](https://github.com/likec4/likec4/commit/8b196615af7180435cd894a2ec39bc6083280994))
- **vscode:** Back button in preview panel

### Bug Fixes

- **diagrams:** improve contextmenu ([487972a](https://github.com/likec4/likec4/commit/487972a52e720e7891dfab0fdd9ceab5346165ff))
- **diagrams:** use value from hash as initialViewId, if available ([2145de6](https://github.com/likec4/likec4/commit/2145de66726e9ef68b326998aedb3dc4e2c994a7))
- **language:** add index view if not present ([836a05e](https://github.com/likec4/likec4/commit/836a05e5e7a55a14e8e7bc3a372e363fe470118e))

# [0.37.0](https://github.com/likec4/likec4/compare/v0.36.0...v0.37.0) (2023-09-14)

### Features

- **language:** extends from another view ([e2a4d59](https://github.com/likec4/likec4/commit/e2a4d590921adefba1e6a951d3eaf5fda74fbd9b))\
  [Documentation](https://likec4.dev/docs/dsl/views/#extend-views)
- **cli:** export views to Mermaid ([#314](https://github.com/likec4/likec4/pull/314)), thanks to [@kcaswick](https://github.com/kcaswick)

# [0.36.0](https://github.com/likec4/likec4/compare/v0.35.0...v0.36.0) (2023-09-12)

### Features

- **cli:** option to use custom HTML template for exported png ([4e7ef2c](https://github.com/likec4/likec4/commit/4e7ef2c50ba1d00b32e061ff4ce6704b8011005b))\
  This allows use custom CSS styling and render additional elements, like View title, description or watermarks.\
  [Documentation](https://likec4.dev/docs/tools/cli/#export)

### Bug Fixes

- **language-server:** separate elements and tags in specification ([#305](https://github.com/likec4/likec4/issues/305)) ([796068f](https://github.com/likec4/likec4/commit/796068fea2e05138fbfcbfadbafabf51730eda72))
- **vscode:** improve logging and telemetry ([#310](https://github.com/likec4/likec4/issues/310)) ([cd175e2](https://github.com/likec4/likec4/commit/cd175e2633747a94ec55c53691a52875f8e73e17))

# [0.35.0](https://github.com/likec4/likec4/compare/v0.34.0...v0.35.0) (2023-09-09)

### Features

- **diagrams:** add `resetHashOnUnmount` and `onReturnToInitial` props to `useViewId` hook ([#301](https://github.com/likec4/likec4/issues/301)) ([563b35b](https://github.com/likec4/likec4/commit/563b35bb6afcbc33dcad7228c697b595d6166b88))
- update typescript to ^5.2.2 ([#298](https://github.com/likec4/likec4/issues/298)) ([956c180](https://github.com/likec4/likec4/commit/956c1804173f884355975e01438fde174cf4898c))
- use Node 20 ([faf7949](https://github.com/likec4/likec4/commit/faf79493c5e353745e1f48d0405311bfcd7f18f6))

### Bug Fixes

- babel compatiblity with Node 20.6 ([b35846c](https://github.com/likec4/likec4/commit/b35846c2fe5f0cab5491bb80fb5caf09778efcc5))
- **deps:** update vitest ^0.34.3 ([#297](https://github.com/likec4/likec4/issues/297)) ([c4a2dbf](https://github.com/likec4/likec4/commit/c4a2dbf6f6678eab95859788edc8ee10059e9d8d))
- **language-server:** memory leak on keeping reference to element ([c7e37f4](https://github.com/likec4/likec4/commit/c7e37f4cb24586ed9f8bd3fe406d31acdb079070))

# [0.34.0](https://github.com/likec4/likec4/compare/v0.33.1...v0.34.0) (2023-09-01)

### Features

- More customization in React components ([1bdf747](https://github.com/likec4/likec4/commit/1bdf747984641285af87c1f2901e4b539166a6d0))
- Updated to Langium 2.0.0 ([fc158f1](https://github.com/likec4/likec4/commit/fc158f125905d05c98543f0bb9f03bcd76ad8a81))

### Bug Fixes

- CLI fails to export image on Windows ([#281](https://github.com/likec4/likec4/issues/281)) ([cc7e054](https://github.com/likec4/likec4/commit/cc7e0545974019c667c3cf7a22f84a0f07ac0760)), closes [#280](https://github.com/likec4/likec4/issues/280)
- improve errors handling ([98735ac](https://github.com/likec4/likec4/commit/98735acd2a7b3c1e58daf3645fcfaa2dcdf16c36))
- workaround for a bug in the `chevrotain-allstar@0.3.0` ([2e20b96](https://github.com/likec4/likec4/commit/2e20b9669eea16417683162d45b9ba3b7c78cee4))

# [0.33.1](https://github.com/likec4/likec4/compare/v0.33.0...v0.33.1) (2023-08-12)

No changes, just trigger release.

# [0.33.0](https://github.com/likec4/likec4/compare/v0.32.0...v0.33.0) (2023-08-12)

### Breaking changes

> We do not change major version yet, as the project is in active development.

This release includes breaking changes in `@likec4/diagrams`:

- **diagrams:** DiagramsBrowser\
  You've already seen this component working on the project website, but it was not back-ported to the npm-module
- **diagrams:** LikeC4 factory\
  Creates components, "bound" to your model, with type checks. It ensures that only existing views can be rendered.

With [`codegen`](https://www.likec4.dev/docs/tools/cli/#codegen) command, CLI generates structured data, like:

```ts
export const LikeC4Views = {
  indexLR: {
    title: 'Landscape View'
    nodes: [/* ... */],
    edges: [/* ... */],
  },
  cloud: {
    title: 'Overview of Cloud'
    nodes: [/* ... */],
    edges: [/* ... */],
  },
}
```

This data is used to draw views with `@likec4/diagrams` react component.

```tsx
import { LikeC4 } from '@likec4/diagrams'
import { LikeC4Views } from './generated-code'

// Creates components, bound to the data (with type checks).
// It ensures that only existing views can be rendered.
const { Diagram, Responsive, Embedded, Browser } = LikeC4.create(LikeC4Views)

export const IndexView = () => <Embedded viewId={'indexLR'} />
```

[Documentaion](https://www.likec4.dev/docs/tools/react/) (in progress)

### Features

- **core:** add color to DiagramLabel ([47b7579](https://github.com/likec4/likec4/commit/47b7579b2c65dd6ba12ce444ae3a05f36acdc83a))
- **core:** add in/out edges to ComputedNode ([0ddb07c](https://github.com/likec4/likec4/commit/0ddb07c6f173ab1affb46e7e53308e37dff1c6c7))
- **core:** available in ESM/CJS
- **diagrams:** available in ESM/CJS

### Bug Fixes

- **generators:** can't infer result type from export `./compute-view` ([#267](https://github.com/likec4/likec4/issues/267)) ([1945a97](https://github.com/likec4/likec4/commit/1945a97c5ecacf9a80d26966bd68ab8a20e4f832))
- **layouts:** disable graphviz.unflatten, requires research ([5379926](https://github.com/likec4/likec4/commit/537992601c2da925cb55f783ea7621970a431290))
- **deps:** pin esbuild to 0.17 ([3d6125d](https://github.com/likec4/likec4/commit/3d6125d2311737074be64ec2c5303390e77d4c66))
- **deps:** update dependency @hpcc-js/wasm to ^2.13.1 ([#254](https://github.com/likec4/likec4/issues/254)) ([3069dab](https://github.com/likec4/likec4/commit/3069dab249b11cfc79d8a22603202ca22d99f864))
- **deps:** update dependency jotai to ^2.2.3 ([#255](https://github.com/likec4/likec4/issues/255)) ([3179777](https://github.com/likec4/likec4/commit/3179777f20dcf564bf3f2d7e17877ae41089c3b9))
- **deps:** update linters to ^6.3.0 ([717770f](https://github.com/likec4/likec4/commit/717770f947ccd102e7e57ce0ff7b0a01f5f7a869))

# [0.32.0](https://github.com/likec4/likec4/compare/v0.31.0...v0.32.0) (2023-08-04)

### Features

- Element icons ([17413f4](https://github.com/likec4/likec4/commit/17413f416ff766800f4caaa2bdc27cc1a4e7ec8e)), closes [#65](https://github.com/likec4/likec4/issues/65)

### Bug Fixes

- **core:** more accurate computeElementView ([e57c7c4](https://github.com/likec4/likec4/commit/e57c7c4cd5df627f839887aafedca4fa98a0fda2))
- **deps:** update dependency class-variance-authority to ^0.7.0 ([dd2bf46](https://github.com/likec4/likec4/commit/dd2bf465c19999b396da7253a28e502364f640a3))
- **deps:** update dependency lucide-react to ^0.263.1 ([d232c26](https://github.com/likec4/likec4/commit/d232c26851787e6b393bbda20e73f7875eb77b97))
- **deps:** update dependency turbo to ^1.10.11 ([#227](https://github.com/likec4/likec4/issues/227)) ([599c230](https://github.com/likec4/likec4/commit/599c230b0ef0af4aa91fe9a5af377886e38edf84))
- **deps:** update linters ([a347385](https://github.com/likec4/likec4/commit/a347385819a4e4f05f49af6f9e200066eca49710))

# [0.31.0](https://github.com/likec4/likec4/compare/v0.30.0...v0.31.0) (2023-07-25)

### Features

- **core:** Add tags, description, links properties to View ([13edf4c](https://github.com/likec4/likec4/commit/13edf4c4da20328dfbc1ec449989040e16596ac7)), closes [#240](https://github.com/likec4/likec4/issues/240)
- **language-server:** Export element and view properties [#240](https://github.com/likec4/likec4/issues/240)

### Known issues

- Relative links are not resolved, follow-up [#244](https://github.com/likec4/likec4/issues/244)

### Bug Fixes

- **deps:** update commitlint monorepo to ^17.6.7 ([dd29487](https://github.com/likec4/likec4/commit/dd2948741c70e0abdfafcece37189cdea57523cf))
- **deps:** update dependency body-scroll-lock-upgrade to ^1.0.4 ([b2da23d](https://github.com/likec4/likec4/commit/b2da23d05ad1915d075dfdd9115711cbdd722557))
- **deps:** update dependency eslint to ^8.45.0 ([82efda1](https://github.com/likec4/likec4/commit/82efda1e7f22b83bc520f0e2dbfb1d91bc5fe1b1))
- **deps:** update dependency jotai to ^2.2.2 ([437a50f](https://github.com/likec4/likec4/commit/437a50fcb0cfca0df716105119a2e3412913f4fa))
- **deps:** update dependency lucide-react to ^0.262.0 ([97541cb](https://github.com/likec4/likec4/commit/97541cbcebbc87bed4996e8fb2addd7a824ff523))
- **deps:** update dependency remeda to ^1.24.0 ([f7ec074](https://github.com/likec4/likec4/commit/f7ec0744303b6b104510371109311bb643925f61))
- **deps:** update dependency tailwind-merge to ^1.14.0 ([4c71882](https://github.com/likec4/likec4/commit/4c718821d516ab7c81b798aee5d394e1309fbbd4))
- **deps:** update dependency word-wrap to ^1.2.5 ([2c0569c](https://github.com/likec4/likec4/commit/2c0569cb98c803d3569381797ae9839414c74aa3))
- **deps:** update nextra monorepo to ^2.10.0 ([010447c](https://github.com/likec4/likec4/commit/010447ceab11642a99833e0507877c3879b42954))
- **deps:** update typescript-eslint monorepo to ^6.1.0 ([c0da381](https://github.com/likec4/likec4/commit/c0da3819d064b73957056bef652222964362a5ab))
- **diagrams:** unique edge key, scoped to diagram, to avoid any issues with diagram transitions ([bc270da](https://github.com/likec4/likec4/commit/bc270da381bb5b6d11c9ff6dd3e4a4322977310c))

# [0.30.0](https://github.com/likec4/likec4/compare/v0.29.0...v0.30.0) (2023-07-21)

### Features

- **diagrams:** Display technology on card, [#208](https://github.com/likec4/likec4/issues/208) ([68d6300](https://github.com/likec4/likec4/commit/68d6300d3cfd44f636f7a96a0b6447c5f5377996))

### Fixes

- **deps:** update dependency word-wrap from 1.2.3 to 1.2.4 (🔒fix: CVE 2023 26115) ([2e5f99](https://github.com/likec4/likec4/commit/2e5f99d5bd8918cf27e00598d92bd1e687f86153))

# [0.29.0](https://github.com/likec4/likec4/compare/v0.28.3...v0.29.0) (2023-07-12)

### Features

- **core:** introduce `modern-errors` and replace `tiny-invariant` ([4caeb61](https://github.com/likec4/likec4/commit/4caeb61237cb39f11736c1f1cee2ef2da345cab5))

### Performance Improvements

- simple caching for model ([f79b53c](https://github.com/likec4/likec4/commit/f79b53c9862c491065391be358c001f9c2807d65))

### Bug Fixes

- **cli:** use node:path module [#212](https://github.com/likec4/likec4/issues/212) ([5f6e1d1](https://github.com/likec4/likec4/commit/5f6e1d1ea268904492c23c222b503baea40dccc8))
- **deps:** update dependency lucide-react to ^0.259.0 ([9636a47](https://github.com/likec4/likec4/commit/9636a4782c445214a820aa6d71d732f3e1c91007))
- **deps:** update typescript-eslint monorepo to ^5.62.0 ([#209](https://github.com/likec4/likec4/issues/209)) ([2c62486](https://github.com/likec4/likec4/commit/2c624865b6f86aa35ae9210f743e9a59b971fa9c))
- **deps:** update typescript-eslint monorepo to v6 (major) ([#210](https://github.com/likec4/likec4/issues/210)) ([aff4cac](https://github.com/likec4/likec4/commit/aff4cac69ff63b7aca1c3406bd90325549d863c1))

# [0.28.3](https://github.com/likec4/likec4/compare/v0.28.1...v0.28.3) (2023-07-07)

trigger release

# [0.28.2](https://github.com/likec4/likec4/compare/v0.28.1...v0.28.2) (2023-07-07)

trigger release
