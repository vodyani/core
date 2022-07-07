# Vodyani core

👩🏻‍🚀 "core" is the top-level design package for vodyani scaffolding, providing a single responsibility module registrar for the different tiers.

[![Npm](https://img.shields.io/npm/v/@vodyani/core/latest.svg)](https://www.npmjs.com/package/@vodyani/core)
[![Npm](https://img.shields.io/npm/v/@vodyani/core/beta.svg)](https://www.npmjs.com/package/@vodyani/core)
[![Npm](https://img.shields.io/npm/dm/@vodyani/core)](https://www.npmjs.com/package/@vodyani/core)
[![License](https://img.shields.io/github/license/vodyani/core)](LICENSE)
<br>
[![codecov](https://codecov.io/gh/vodyani/core/branch/main/graph/badge.svg?token=YHBHSZH5PB)](https://codecov.io/gh/vodyani/core)
![Workflow](https://github.com/vodyani/core/actions/workflows/release.yml/badge.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Features

|Features|Type|Description|
|:-:|:-:|:-:|
|InfrastructureRegister|class decorator|Used to replace  the **@Module** from **Nest.js** and provide a single responsible `infrastructure module` registra.r|
|DomainRegister|class decorator|Used to replace  the **@Module** from **Nest.js** and provide a single responsible `domain module` registrar.|
|ApiRegister|class decorator|Used to replace  the **@Module** from **Nest.js** and provide a single responsible `application interface module` registrar.|
|ContainerRegister|class decorator|Used to replace  the **@Module** from **Nest.js** and provide a single responsible `application container module` registrar.|
|InstanceContainer|class|Structure for storing multiple instances.|
|AsyncProviderFactory|interface|Abstract factory for implementing the creation of `Nest.js` factory providers.|

## Installation

```bash
npm install @vodyani/core
```

## Documentation
[Vodyani core documentation📚](https://vodyani.vercel.app/docs/advanced/core)

## License

Vodyani core is [MIT licensed](LICENSE).
