// FC functional component se exporta la funcion, el return de la funcion tiene que ser el JSX

// CC es un extende del react componenete, se usa la funcion constructira y despues se invoca a la funcion render y el return de eso es el JSX,
// puede invocar funciones auxiliares antes de llamar al metodo render

CC0; // main component
// aqui es donde se importaron todos los demas componentes, no muestra directamente nada pero organiza las rutas y todos los demas componentes
// main  its a class component, se le pasan los super props y demas estados dentro del contructor
// se llama a la funcion render y el return de esta funcion es el jsx que se renderiza
// antes de llamar al return podemos almecenar funciones intenrnas que usar dentro de esta nueva clase extendida

CC1; // header es un class component porque usa el estado, (para activar y desactivar el modo responsive) pero no recibe relamente ningun prop que use de Main

FC2; // footer es un fucntion component, no necesita props

FC3; // home muestra los featured, hace filtro sobres los shared para mostrar los que tienen esa propiedad
// este es medio complicado hace de la siguiente manera:
// pasa los props al componenete dentro de una constante que esta en main component
// adentro del componente home tiene dos functional components, uno que es pasado al main y otro que se utiliza adentro del home

FC4; //  contact es un functional component
// basicmanete se le uso como ejemplo para usar los awsome fonts

FC5; // Menu component

6; // Dish detail component
// dentro de main componente tiene dos dos rutas
//dentro del archivo propiamente dicho tiene una cosntante que es un functional component y despues tiene dos funciones auxiliares
