# react-projection-mapping

<a href="https://react-projection-mapping.vercel.app">
<img src="https://raw.githubusercontent.com/wirewirewirewire/react-projection-mapping/main/packages/docs/src/app/github-image.png" data-canonical-src="https://raw.githubusercontent.com/wirewirewirewire/react-projection-mapping/main/packages/docs/src/app/github-image.png" width="400"  />
</a>

Distort a container by using css 3D transforms for projection mapping and software keystone for [react](https://react.dev).

[Demo application ℹ️](https://react-projection-mapping.vercel.app)

## Features 🌟

- Distort any container by using a rectangle
- Centralized control and update of multiple containers
- Split up containers into tiles

## Usage 🖼️

Install via npm

```bash
npm install react-projection-mapping --save
```

Wrap your application with `Projection`.

```jsx
import { Projection } from "react-projection-mapping";

<Projection data={data} onChange={update} editing={true} enabled={true}>
  Your containers
</Projection>;
```

### Saving values 💾

Use the `onChange` prop to save the current values.

```jsx
const update = ({ values, action }) => {
  if (action === "onEnd") {
    localStorage.setItem("projection", JSON.stringify(values));
  }
};
```

#### Get values 🔋

`data` allows you to load the values from an endpoint.

```jsx
const [items, setItems] = useState();

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("projection"));
  if (data) {
    setItems(data);
  }
}, []);
```

Each Element you want to distort should wrapped with `Layer`. Make sure to add an unique `id`.

```jsx
import { Layer } from "react-projection-mapping";

<Layer id="total">Element</Layer>;
```

### SplitLayer

Use the `SplitLayer` component to separate the Layer into multiple other layers. It renders the same component multiple times and uses [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) to split it. It can take all settings from `Layer`.

```jsx
import { Projection, SplitLayer } from "react-projection-mapping";

<Projection data={data} onChange={update} edit={true} enabled={true}>
  {[...Array(2)].map((y, index) => (
    <SplitLayer
      key={index}
      id={`tile-${index}`}
      clip={[0, index === 0 ? 50 : 0, 0, index === 0 ? 0 : 50]}
    >
      Content
    </SplitLayer>
  ))}
</Projection>;
```

### `useProjection()`` hook

Hook to get the current distort status or manually set it from any place inside `Projection`.

```jsx
import { useProjection } from "react-projection-mapping";

const {
  data,
  edit,
  enabled,
  selectedCorner,
  selectedLayer,
  setSelectedCorner,
  setSelectedLayer,
} = useProjection();
```

Results from the `useProjection()` hook

```jsx
{
  "data": {
    "id-of-layer": [
      -326, 175, -212, 93, -184, 236, -73, 157
    ]
  },
  "edit": true,
  "enabled": true,
  "selectedCorner": 0,
  "selectedLayer": "id-of-layer",
  "setSelectedCorner": () => { return number},
  "setSelectedLayer": () => {return "id-of-layer" }
} cvfgh]       
```

### Inspired by

- https://github.com/alex3165/react-mapping
- http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
- https://bl.ocks.org/mbostock/10571478
- https://github.com/glowbox/maptasticjs
