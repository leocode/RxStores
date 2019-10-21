# RxStores

Modular state manager for TS/JS apps, based on RxJS and focused on performance.

## Prerequisites

- Basic knowledge of RxJS



## Installation

At present, you can obtain the package only from this repository.



## Main concepts and principles

### Store

Store acts as **an observable data source** for any view or view-model part of an app. A single store serves single data model. You can define your own interface here. It may be either only a facade for some complex business logic, or a container for some part of the logic as well.

By design, stores will expose two main properties:
- `data` of RxJS Observable type
- `methods` with logic-only interface exposed

One can use the logic interface either in the store instance itself, or using the `methods` property just for convention sake. See the example below.

### Context

The main goal is to simplify things. By default, when one wants to access a store, it is obtained from a single, app-wide source, called **context**. Not all apps are developed the same way, though. This is where a decision was made to allow using custom contexts.

### Provider

Speaking of simplifying things, there is a single provider with exposed getters for stores and custom contexts.

## Usage

### Simple example

The simplest store one can create looks like this:
```typescript
export class SomeStore extends AbstractStore {
  init() {}
}
```

Then, it can be used this way:
```typescript
function onDataChange(data) { ... }

const store = Provider.getStore(SomeStore);
// Or, if you want to use a custom context
            = Provider.from('some custom context').getStore(SomeStore);

const subscription = store.data.subscribe(onDataChange);
```

This doesn't do much, though. There's no initial data and no methods that could change the state.


### Defining a data model and initial value

#### TypeScript

```typescript
export interface SomeModel {
  superImportantValue: number;
}

export class SomeStore extends AbstractStore<SomeModel> {
  constructor() {
    const initialValue: SomeModel = { superImportantValue: 5 };

    super(initialValue);
  }
}
```

#### JavaScript (JSDoc)

```javascript
/**
 * @typedef {object} SomeModel
 * @property {number} superImportantValue
 */

/**
 * @class
 * @extends {AbstractStore<SomeModel>}
 */
export class SomeStore extends AbstractStore {
  constructor() {
    /** @type {SomeModel} */
    const initialValue = { superImportantValue: 5 };

    super(initialValue);
  }
}
```

> From now on, all examples will use TypeScript.


### Defining the logic interface

```typescript
export class SomeStore extends AbstractStore<SomeModel> {
  constructor() {
    super({ superImportantValue: 5 });
  }

  generateNewValue() {
    const newValue = Math.round(Math.random() * 10);

    this.emit(newValue);
  }

  // all the methods go here
}
```

#### Accessing the interface

```typescript
const someStore = Provider.getStore(SomeStore);

someStore.generateNewValue();
// or
someStore.methods.generateNewValue();
```



## Roadmap

While heads can be full of ideas, this library aims to be as modular and performant as possible. Thus, new features will be added to the project when it is obvious that no core rule is broken.

Current ideas include:
- [ ] React bindings
- [ ] Optional persistence
