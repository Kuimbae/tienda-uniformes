import {describe, it, expect, vi} from 'vitest';
import {useProductStore} from './useProductStore.jsx';

describe ('Zustand Store', () => {
    // Definimos un producto de incio
    const producto = { id: '0000'}


    it('Deberia incrementar la cantidad despues de llamar a increaseQuantity', () => {
    
        // Vaciamos el carro y comprobamos que esta vacio
        useProductStore.getState().clearCart();
        expect(useProductStore.getState().cart.length).toBe(0);

        // Agregamos un producto al carro y comprobamos que el carro no esta vacio
        useProductStore.getState().addToCart(producto);
        expect(useProductStore.getState().cart.length).not.toBe(0);


        // Obtenemos la funcion increaseQuantity
        const { increaseQuantity } = useProductStore.getState();

        // Moqueamos la funcion increaseQuantity
        const mockIncreaseQuantity = vi.fn(increaseQuantity);

        // Reemplazamos la funcion original por la moqueada
        useProductStore.setState({ increaseQuantity: mockIncreaseQuantity });

        // Incrementamos en una unidad
        useProductStore.getState().increaseQuantity(producto.id);

        // Comprobar que la funcion moqueada fue llamada
        expect(mockIncreaseQuantity).toHaveBeenCalled();

        // Recogemos el producto en el carro
        const existing = useProductStore.getState().cart.find((item) => item.id === producto.id); 

        // Comprobamos que la cantidad del producto se incremento en 1
        expect(existing.quantity).toBe(2);  

        // Restauramos la funcion original
        useProductStore.setState({ increaseQuantity: increaseQuantity });
    }); 
})
