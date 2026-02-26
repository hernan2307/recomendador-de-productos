import { useEffect, useMemo, useState } from 'react'
import { useCarrito } from '../../core/contexto/CarritoContexto'
import { obtenerAdicionalesPorTipo, obtenerLocalidades, obtenerOfertasPorDisponibilidad } from '../../core/servicios/apiCliente'
import type { Adicional } from '../../core/tipos/Adicional'
import type { Localidad } from '../../core/tipos/Localidad'
import type { Oferta, TipoProducto } from '../../core/tipos/Oferta'

type Pestana = 'Combo' | 'Flow' | 'Personal'

interface MapaAdicionales {
  Tv?: Adicional[]
  Internet?: Adicional[]
  Combo?: Adicional[]
}

export function RecomendadorPage() {
  const [segmento, setSegmento] = useState<'Individuo' | 'Soho/SMB'>('Individuo')
  const [localidades, setLocalidades] = useState<Localidad[]>([])
  const [localidadSeleccionadaId, setLocalidadSeleccionadaId] = useState<string | ''>('')
  const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState<string | undefined>(
    undefined,
  )

  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [adicionalesPorTipo, setAdicionalesPorTipo] = useState<MapaAdicionales>({})
  const [pestanaActiva, setPestanaActiva] = useState<Pestana>('Personal')

  const [estadoCargaLocalidades, setEstadoCargaLocalidades] = useState<
    'inicial' | 'cargando' | 'ok' | 'error'
  >('inicial')
  const [estadoCargaOfertas, setEstadoCargaOfertas] = useState<
    'inicial' | 'cargando' | 'ok' | 'error'
  >('inicial')

  const { cantidadItems, primeraFactura, ahorroTotal, vaciarCarrito, eliminarItemDelCarrito, items } =
    useCarrito()

  useEffect(() => {
    async function cargarLocalidades(): Promise<void> {
      try {
        setEstadoCargaLocalidades('cargando')
        const data = await obtenerLocalidades()
        setLocalidades(data)
        setEstadoCargaLocalidades('ok')
      } catch (error) {
        console.error('Error al obtener localidades', error)
        setEstadoCargaLocalidades('error')
      }
    }
    cargarLocalidades().catch(() => {})
  }, [])

  const ofertasFiltradasPorPestana = useMemo(() => {
    const tipo: TipoProducto | undefined =
      pestanaActiva === 'Combo' ? 'Combo' : pestanaActiva === 'Flow' ? 'Tv' : 'Internet'
    if (tipo == null) return []
    return ofertas.filter((oferta) => oferta.tipo === tipo)
  }, [ofertas, pestanaActiva])

  async function manejarTraerOferta(): Promise<void> {
    const localidad = localidades.find((l) => l.id === localidadSeleccionadaId)
    const disponibilidad = localidad?.disponibilidad
    setDisponibilidadSeleccionada(disponibilidad)
    try {
      setEstadoCargaOfertas('cargando')
      const nuevasOfertas = await obtenerOfertasPorDisponibilidad(disponibilidad)
      setOfertas(nuevasOfertas)
      setEstadoCargaOfertas('ok')

      const tipos: TipoProducto[] = ['Tv', 'Internet', 'Combo']
      const resultados = await Promise.all(
        tipos.map(async (tipo) => {
          try {
            const lista = await obtenerAdicionalesPorTipo(tipo)
            return [tipo, lista] as const
          } catch (error) {
            console.error('Error al obtener adicionales para', tipo, error)
            return [tipo, [] as Adicional[]] as const
          }
        }),
      )

      const mapa: MapaAdicionales = {}
      for (const [tipo, lista] of resultados) {
        mapa[tipo] = lista
      }
      setAdicionalesPorTipo(mapa)
    } catch (error) {
      console.error('Error al obtener ofertas', error)
      setEstadoCargaOfertas('error')
    }
  }

  function manejarBorrarTodo(): void {
    setOfertas([])
    setAdicionalesPorTipo({})
    setDisponibilidadSeleccionada(undefined)
    vaciarCarrito()
  }

  const localidadSeleccionada = localidades.find((l) => l.id === localidadSeleccionadaId)

  return (
    <div className="app-shell">
      <aside className="panel-cliente">
        <div className="panel-cliente-titulo">Datos del Cliente</div>

        <div>
          <div className="panel-cliente-campo-label">Segmento</div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              className="panel-cliente-toggle"
              style={{
                flex: 1,
                backgroundColor: segmento === 'Individuo' ? '#16a34a' : '#030712',
                borderColor: segmento === 'Individuo' ? '#22c55e' : '#374151',
                color: segmento === 'Individuo' ? '#022c22' : '#e5e7eb',
              }}
              onClick={() => setSegmento('Individuo')}
            >
              Individuo
            </button>
            <button
              type="button"
              className="panel-cliente-toggle"
              style={{
                flex: 1,
                backgroundColor: segmento === 'Soho/SMB' ? '#16a34a' : '#030712',
                borderColor: segmento === 'Soho/SMB' ? '#22c55e' : '#374151',
                color: segmento === 'Soho/SMB' ? '#022c22' : '#e5e7eb',
              }}
              onClick={() => setSegmento('Soho/SMB')}
            >
              Soho/SMB
            </button>
          </div>
        </div>

        <div>
          <div className="panel-cliente-campo-label">Localidad / Provincia</div>
          <select
            className="panel-cliente-select"
            value={localidadSeleccionadaId}
            onChange={(e) => setLocalidadSeleccionadaId(e.target.value)}
          >
            <option value="">Seleccionar localidad...</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nombre} - {loc.disponibilidad}
              </option>
            ))}
          </select>
          {estadoCargaLocalidades === 'cargando' && (
            <div className="estado-cargando">Cargando localidades...</div>
          )}
          {estadoCargaLocalidades === 'error' && (
            <div className="estado-error">No se pudieron cargar las localidades.</div>
          )}
        </div>

        <div className="panel-cliente-botones">
          <button
            type="button"
            className="btn-primario"
            onClick={manejarTraerOferta}
            disabled={!localidadSeleccionadaId}
          >
            Traer oferta
          </button>
          <button type="button" className="btn-borrar" onClick={manejarBorrarTodo}>
            Borrar todo
          </button>
        </div>

     {/*    {localidadSeleccionada != null && (
          <button type="button" className="btn-link">
            {localidadSeleccionada.nombre} ·{' '}
            {localidadSeleccionada.disponibilidad === 'CABA' ? 'CABA' : 'Resto País'}
          </button>
        )} */}
      </aside>

      <section className="contenido-ofertas">
        <div className="tabs-ofertas">
          <button
            type="button"
            className={`tabs-ofertas-tab ${
              pestanaActiva === 'Combo' ? 'tabs-ofertas-tab-activo' : ''
            }`}
            onClick={() => setPestanaActiva('Combo')}
          >
            Combos
          </button>
          <button
            type="button"
            className={`tabs-ofertas-tab ${
              pestanaActiva === 'Flow' ? 'tabs-ofertas-tab-activo' : ''
            }`}
            onClick={() => setPestanaActiva('Flow')}
          >
            Flow
          </button>
          <button
            type="button"
            className={`tabs-ofertas-tab ${
              pestanaActiva === 'Personal' ? 'tabs-ofertas-tab-activo' : ''
            }`}
            onClick={() => setPestanaActiva('Personal')}
          >
            Personal
          </button>

          <div className="tabs-ofertas-carrito">
            <span>Carrito</span>
            <span className="tabs-ofertas-carrito-resumen">
              {cantidadItems} ítems · ${primeraFactura.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        <div style={{ paddingInline: '0.75rem', paddingTop: '0.4rem', fontSize: '0.8rem' }}>
          {disponibilidadSeleccionada != null ? (
            <span>
              Mostrando ofertas para{' '}
              <strong>
                {disponibilidadSeleccionada === 'CABA' ? 'CABA' : 'Resto del país'}
              </strong>
            </span>
          ) : (
            <span className="estado-cargando">
              Seleccioná una localidad y presioná &quot;Traer oferta&quot;.
            </span>
          )}
        </div>

        <div className="lista-ofertas">
          {estadoCargaOfertas === 'cargando' && (
            <div className="estado-cargando">Buscando ofertas disponibles…</div>
          )}
          {estadoCargaOfertas === 'error' && (
            <div className="estado-error">
              Ocurrió un problema al obtener las ofertas. Intentá nuevamente.
            </div>
          )}
          {estadoCargaOfertas !== 'cargando' && ofertasFiltradasPorPestana.length === 0 && (
            <div className="estado-vacio">
              No hay ofertas para mostrar en esta pestaña con los filtros actuales.
            </div>
          )}

          {ofertasFiltradasPorPestana.map((oferta) => {
            const adicionalesCompatibles =
              adicionalesPorTipo[(oferta.tipo as TipoProducto) ?? 'Internet'] ?? []
            return (
              <TarjetaOferta
                key={oferta.id}
                oferta={oferta}
                adicionales={adicionalesCompatibles}
              />
            )
          })}
        </div>
      </section>

      <aside className="carrito-panel">
        <div className="carrito-panel-titulo">
          <span>Carrito</span>
          <button type="button" className="btn-link" onClick={vaciarCarrito} disabled={!items.length}>
            Vaciar carrito
          </button>
        </div>

        <div className="carrito-panel-resumen">
          <div className="carrito-panel-resumen-item">
            <span className="carrito-panel-resumen-label">Primera factura</span>
            <span className="carrito-panel-resumen-valor">
              ${primeraFactura.toLocaleString('es-AR')}
            </span>
          </div>
          <div className="carrito-panel-resumen-item">
            <span className="carrito-panel-resumen-label">Ahorro total</span>
            <span className="carrito-panel-resumen-valor">
              ${ahorroTotal.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        <div className="carrito-panel-lista">
          {items.length === 0 && (
            <div className="estado-vacio">Todavía no agregaste productos al carrito.</div>
          )}

          {items.map((item) => (
            <div key={item.id} className="carrito-item">
              <div>
                <div className="carrito-item-titulo">{item.titulo}</div>
                <div className="carrito-item-detalle">{item.descripcion}</div>
                <button
                  type="button"
                  className="carrito-item-eliminar"
                  onClick={() => eliminarItemDelCarrito(item.id)}
                >
                  Quitar
                </button>
              </div>
              <div className="carrito-item-precio">${item.precioFinal.toLocaleString('es-AR')}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

interface TarjetaOfertaProps {
  oferta: Oferta
  adicionales: Adicional[]
}

function TarjetaOferta({ oferta, adicionales }: TarjetaOfertaProps) {
  const [expandida, setExpandida] = useState(false)
  const { agregarOfertaAlCarrito, agregarAdicionalAlCarrito } = useCarrito()

  const ahorro = oferta.precioLista - oferta.precioFinal

  return (
    <article className="tarjeta-oferta">
      <div className="tarjeta-oferta-encabezado">
        <div className="tarjeta-oferta-logo">TELECOM</div>
        <div className="tarjeta-oferta-titulos">
          <div className="tarjeta-oferta-nombre">{oferta.nombre}</div>
          <div className="tarjeta-oferta-subtitulo">
            {oferta.tipo === 'Combo'
              ? 'Flow + Internet'
              : oferta.tipo === 'Tv'
                ? 'Flow'
                : 'Internet'}{' '}
            · ID promo {oferta.idPromo ?? '-'}
          </div>
        </div>
        <div className="tarjeta-oferta-precio">
          <span className="tarjeta-oferta-precio-label">Total actual</span>
          <span className="tarjeta-oferta-precio-valor">
            ${oferta.precioFinal.toLocaleString('es-AR')}
          </span>
        </div>
        <div className="tarjeta-oferta-encabezado-info">
          <div className="tarjeta-oferta-encabezado-item">
            <span className="tarjeta-oferta-encabezado-item-label">Precio de lista</span>
            <span className="tarjeta-oferta-encabezado-item-valor">
              ${oferta.precioLista.toLocaleString('es-AR')}
            </span>
          </div>
          <div className="tarjeta-oferta-encabezado-item">
            <span className="tarjeta-oferta-encabezado-item-label">Oferta hogar</span>
            <span className="tarjeta-oferta-encabezado-item-valor">
              {oferta.promo ?? 'Sin promo'}
            </span>
          </div>
          <div className="tarjeta-oferta-encabezado-item">
            <span className="tarjeta-oferta-encabezado-item-label">Ahorro</span>
            <span className="tarjeta-oferta-encabezado-item-valor">
              ${ahorro.toLocaleString('es-AR')}
            </span>
          </div>
        </div>
      </div>

      {expandida && (
        <div className="tarjeta-oferta-cuerpo">
          <div>
            <div className="tarjeta-oferta-adicionales-titulo">Adicionales compatibles</div>
            <div className="tarjeta-oferta-adicionales-lista">
              {adicionales.length === 0 && (
                <span className="estado-vacio">No hay adicionales disponibles para este tipo.</span>
              )}
              {adicionales.map((adicional) => (
                <button
                  key={adicional.id}
                  type="button"
                  className="chip-adicional"
                  onClick={() => agregarAdicionalAlCarrito(adicional, oferta.id)}
                >
                  <span>{adicional.nombre}</span>
                  <span className="chip-adicional-precio">
                    ${adicional.precioFinal.toLocaleString('es-AR')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="tarjeta-oferta-acciones">
        <button type="button" className="btn-detalle" onClick={() => setExpandida(!expandida)}>
          {expandida ? 'Ocultar detalle' : 'Ver detalle'}
        </button>
        <button type="button" className="btn-primario" onClick={() => agregarOfertaAlCarrito(oferta)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

