# RxStores

Modular state manager for TS/JS apps, based on RxJS and focused on performance.

## Prerequisites

- Basic knowledge of RxJS

## Installation

### npm

```
npm i @leocode/rxstores
```

### Yarn

```
yarn add @leocode/rxstores
```

Type definitions are built-in.

## Main concepts

### Store

Store acts as **an observable data source** for any view or view-model part of an app. A single store serves single data model. You can define your own interface here. It may be either only a facade for some complex business logic, or a container for some part of the logic as well.

By design, stores will expose two main properties:

- `data` of RxJS Observable type
- `methods` with logic-only interface exposed

One can use the logic interface either in the store instance itself, or using the `methods` property just for convention sake. See the example below.

### Context

Context is a named container for stores. By default, the global one is used. One can select a custom one - see the example below.

### Provider

Provider is a single, app-wide mechanism that exposes getters for stores and custom contexts.

## Usage

### Simple example

The simplest store one can create looks like this:

```typescript
// stores/some.store.ts

import { Store } from "@leocode/rxstores";

export class SomeStore extends Store {
  init() {} // must be defined!
}
```

At this point, we have created the definition of SomeStore. Notice the `init` function, which is called right after the store is created. You might want to put here some initialization logic, e.g. API data fetching. Every store should implement initialization logic, even if empty.

Then, it can be used this way:

```typescript
// index.js/ts

// define a callback function that will be called every time store's state changes
function onDataChange(data) {
  console.log("New data!", data);
}

// get a store from the global context
const store = Provider.getStore(SomeStore);
// or from a custom context
const store = Provider.from("some custom context").getStore(SomeStore);

// subscribe to the store with a callback function
const subscription = store.data$.subscribe(onDataChange);

// get store's current value using `value` property getter
const currentValue = store.value;

// emit a new value using `value` property setter
store.value = "some different value";
```

Provider lets us get a store directly from the global context, or specify a custom one with `.from('context name')`.

This implementation doesn't do much, though. There's no initial data and no methods that could change the state. Let's fix this.

### Defining a data model and initial value

#### TypeScript

```typescript
// stores/some.store.ts

// define a model for data stored within the store below
export interface SomeModel {
  superImportantValue: number;
}

// create a store by extending base Store class and provide model type
export class SomeStore extends Store<SomeModel> {
  constructor() {
    const initialValue: SomeModel = { superImportantValue: 5 };

    // let base Store know that you want to provide an initial value
    super(initialValue);
  }

  init() {}
}
```

Now, we have provided an initial value for SomeStore. If initial value fetching logic is asynchronous, one can put it inside `init` method.

```typescript
...

export class SomeStore extends Store<SomeModel> {
  ...

  // we can use async keyword here
  async init() {
    const remoteData = await fetch('/super-important-data')
      .then(r => r.json());
    this.value = remoteData;
  }
}
```

The issue is that view controllers are not able to know whether the data is loading, errored while loading, or is just non-existent. We can use a model helper class called Loadable.

```typescript
import { Loadable } from '@leocode/rxstores/helpers';

...

export class SomeStore extends Store<SomeModel> {
  constructor() {
    super(Loadable.ofLoading<SomeModel>());
  }

  // we can use async keyword here
  async init() {
    try {
      const remoteData = await fetch('/super-important-data')
        .then(r => r.json());
      this.value = Loadable.ofData(remoteData);
    } catch (e) {
      this.value = Loadable.ofError(e);
    }
  }
}
```

### Defining the logic interface

```typescript
// stores/some.store.ts

export class SomeStore extends Store<SomeModel> {
  constructor() {
    super({ superImportantValue: 5 });
  }

  init() {}

  generateNewValue() {
    const newValue = Math.round(Math.random() * 10);

    this.value = newValue;
  }

  // all the methods go here
}
```

#### Accessing the interface

```typescript
// index.js/ts

const someStore = Provider.getStore(SomeStore);

someStore.generateNewValue();
// or
someStore.methods.generateNewValue();
```

### API

#### Store

| Name                | Description                                                                                                                            | isRequired |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **constructor**     | Here you can pass an initial value for your class, like user object                                                                    | no         |
| **init**            | Here goes all magic with creating your store. Put here code which has to be run at first, like downloading data, etc.                  | yes        |
| **_(get)_ value**   | This getter returns the value stored in this specific store, you don’t have to declare it. It is inside, just use it with `this.value` | yes        |
| **_(get)_ methods** | This returns all method you declare in your class, this can return an empty object if you don’t have any methods                       | no         |
| **_(get)_ data\$**  | This is your Observable, you should subscribe to it if you want to have a value up to date                                             | yes        |
| **_(set)_ value**   | Set data with this function in your class implementation                                                                               | no         |

## Roadmap

While heads can be full of ideas, this library aims to be as modular and performant as possible. Thus, new features will be added to the project when it is obvious that no core rule is broken.

Current ideas include:

- [ ] React bindings
- [ ] Optional persistence
