package com.example.Controller;
import com.example.Entity.Pedido;
import com.example.Entity.MpPreference;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/apiMp")
@CrossOrigin("*")
public class MercadoPagoController {

    @PostMapping
    @CrossOrigin("*")
    public MpPreference getList(@RequestBody Pedido pedido) {

        try {
            MercadoPagoConfig.setAccessToken("TEST-2798566161607489-052311-a8e97e298823f472ca61f8c492cbb871-322089866");

            //Creamos la preferencia
            //PREFERENCIA DE VENTA
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id(pedido.getId().toString())
                    .title("compra producto")
                    .description("Pedido realizado desde el carrito de compras")
                    .pictureUrl("https://acdn.mitiendanube.com/stores/813/752/products/spruce41-31-d9af8e704d16b81a9216426267078691-1024-1024.jpg")
                    .quantity(1)
                    .currencyId("ARG")
                    .unitPrice(new BigDecimal(pedido.getTotalPedido()))
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);
            System.out.println("\n item request " + itemRequest.getUnitPrice()  + " id " + itemRequest.getId());
            //preferencia de control de sucesos en el caso que toque lo redirecciona a otra pagna
            //aca no pueden ir url localesm, pero hacemos una excepcion
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:5173")
                    .pending("http://localhost:5173")
                    .failure("http://localhost:5173")
                    .build();

            //preferencia que tendra todas las preferencias que se hayan creado
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .build();

            // creo un cliente para comunicarme con mp
            PreferenceClient client = new PreferenceClient();
            //se crea una nueeva prefertencia que es igual a lla respuesta
            Preference preference = client.create(preferenceRequest);


            MpPreference mpPreference = new MpPreference();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());
            System.out.println("\n " + mpPreference.getId() + " status " + mpPreference.getStatusCode());
            return mpPreference;
        } catch (MPException e) {
            throw new RuntimeException(e);

        } catch (MPApiException e) {
            throw new RuntimeException(e);
        }
    }
}
