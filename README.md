# react-projection-mapping

Helpers to work with interactive exhibitions build in [react](https://react.dev).

## Features

- API interface
- LanguageSwitcher
- Mdx Components
- TouchElement
- UniPiControl
- Preview
- Timeout Usage
- Design Tokens (to be moved)

## Distort 🖼️

This tool allows you to distort a container by using css 3D transforms for projection mapping and software keystone.

TODO: Add split tool, add select indivdual container or corner

#### Usage

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

### useDistort

TODO: Hook to get the current distort status or manually set it from any place inside `DistortControl`.

#### Inspired by

- https://github.com/alex3165/react-mapping
- http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
- https://bl.ocks.org/mbostock/10571478
- https://github.com/glowbox/maptasticjs

### useIsDesktop

## API

Endpoints to download data

```
NEXT_PUBLIC_KEYSTONE_SECRET=XXXXXX
```

## MDX

Use mdx components inside the markdown renderer

```jsx
import { components } from "@wirewire/react-exhibition/mdx";

<MDXRemote {...entry.mdxSource} components={components} />;
```

```

```
