# react-projection-mapping


<img src="https://raw.githubusercontent.com/wirewirewirewire/react-projection-mapping/main/packages/docs/src/app/github-image.png" data-canonical-src="https://raw.githubusercontent.com/wirewirewirewire/react-projection-mapping/main/packages/docs/src/app/github-image.png" width="400"  />

Distort a container by using css 3D transforms for projection mapping and software keystone for [react](https://react.dev).

## Features 🌟

- Distort any container by using a rectangle
- Centralized control and update of multiple containers
- Split up containers into tiles

## Usage 🖼️

Wrap your application with `DistortControl`. TODO: Seperate Make sure to add the `NEXT_PUBLIC_KEYSTONE_SECRET` environment variable to your application.

```jsx
import { DistortControl } from "@wirewire/react-exhibition";

<DistortControl data={data} update={update} editing={true} enabled={true}>
  Your containers
</DistortControl>;
```

### Saving values

Use the `update` prop to save the current values.

```jsx
const update = ({ values, action }) => {
  if (action === "onEnd") {
    localStorage.setItem("distort", JSON.stringify(values));
  }
};
```

#### Get values

`data` allows you to load the values from an endpoint.

```jsx
const [items, setItems] = useState([]);

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("distort"));
  if (data) {
    setItems(data);
  }
}, []);
```

Each Element you want to distort should wrapped with `DistortContainer`. Make sure to add an unique `id`.

```jsx
import { DistortContainer } from "@wirewire/react-exhibition";

<DistortContainer id="total">Element</DistortContailer>
```
### DistortSplit

TODO: Add docs

### useDistort() hook

TODO: Hook to get the current distort status or manually set it from any place inside `DistortControl`.

#### Inspired by

- https://github.com/alex3165/react-mapping
- http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
- https://bl.ocks.org/mbostock/10571478
- https://github.com/glowbox/maptasticjs
