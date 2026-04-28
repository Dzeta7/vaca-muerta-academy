import { useState } from "react";

const COURSES = [
  {
    id: 1,
    category: "Electricidad",
    icon: "⚡",
    title: "Instalaciones Eléctricas Residenciales",
    subtitle: "De cero a tablero terminado",
    desc: "Dimensionado de cables, disyuntores, diferenciales y puesta a tierra según reglamentación AEA.",
    price: 12,
    originalPrice: 18,
    level: "Inicial",
    duration: "4 hs",
    students: 214,
    color: "#F59E0B",
    tag: "MÁS VENDIDO",
  },
  {
    id: 2,
    category: "Electricidad",
    icon: "⚡",
    title: "Tableros Eléctricos Industriales",
    subtitle: "Armado, conexión y protecciones",
    desc: "Esquemas de mando, potencia y control. Comandos directos e invertidos de motores.",
    price: 18,
    originalPrice: 28,
    level: "Intermedio",
    duration: "6 hs",
    students: 98,
    color: "#F59E0B",
    tag: null,
  },
  {
    id: 3,
    category: "Mecánica",
    icon: "🔧",
    title: "Mantenimiento Mecánico en Campo",
    subtitle: "Para operadores y técnicos",
    desc: "Rodamientos, sellos, acoples y lubricación. Procedimientos estándar en equipos de Vaca Muerta.",
    price: 15,
    originalPrice: 22,
    level: "Inicial",
    duration: "5 hs",
    students: 176,
    color: "#3B82F6",
    tag: "NUEVO",
  },
  {
    id: 4,
    category: "Mecánica",
    icon: "🔧",
    title: "Lectura de Planos Mecánicos",
    subtitle: "Vistas, cortes y tolerancias",
    desc: "Interpretación de planos industriales, simbología ISO y lectura de isométricos de tubería.",
    price: 10,
    originalPrice: null,
    level: "Inicial",
    duration: "3 hs",
    students: 89,
    color: "#3B82F6",
    tag: null,
  },
  {
    id: 5,
    category: "Herramientas",
    icon: "📊",
    title: "Excel para Técnicos de Campo",
    subtitle: "Planillas reales del sector",
    desc: "Registros de mantenimiento, reportes de turno, cálculo de consumos y gráficos operativos.",
    price: 9,
    originalPrice: 14,
    level: "Inicial",
    duration: "3 hs",
    students: 301,
    color: "#10B981",
    tag: "MÁS VENDIDO",
  },
  {
    id: 6,
    category: "Herramientas",
    icon: "📐",
    title: "AutoCAD Eléctrico Básico",
    subtitle: "Planos listos para obra",
    desc: "Comandos esenciales, simbología eléctrica, plantillas de planos unifilares y de instalación.",
    price: 16,
    originalPrice: 24,
    level: "Inicial",
    duration: "5 hs",
    students: 143,
    color: "#10B981",
    tag: null,
  },
  {
    id: 7,
    category: "Carrera",
    icon: "📄",
    title: "CV Profesional para Vaca Muerta",
    subtitle: "Formato que las empresas buscan",
    desc: "Plantillas usadas por Techint, OPS, Halliburton. Carta de presentación y perfil de LinkedIn incluidos.",
    price: 8,
    originalPrice: 12,
    level: "Todos",
    duration: "2 hs",
    students: 428,
    color: "#8B5CF6",
    tag: "MÁS VENDIDO",
  },
  {
    id: 8,
    category: "Carrera",
    icon: "🛢️",
    title: "Intro a la Industria Petrolera",
    subtitle: "Cómo funciona Vaca Muerta",
    desc: "Operaciones de perforación, completación y producción. Roles, empresas y cómo entrar al sector.",
    price: 10,
    originalPrice: null,
    level: "Todos",
    duration: "3 hs",
    students: 512,
    color: "#8B5CF6",
    tag: "NUEVO",
  },
];

const CATEGORIES = ["Todos", "Electricidad", "Mecánica", "Herramientas", "Carrera"];

const levelColor = { Inicial: "#10B981", Intermedio: "#F59E0B", Todos: "#6B7280" };

export default function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [cartOpen, setCartOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(false);

  const filtered = filter === "Todos" ? COURSES : COURSES.filter(c => c.category === filter);
  const inCart = (id) => cart.some(c => c.id === id);
  const toggle = (course) => {
    if (inCart(course.id)) setCart(cart.filter(c => c.id !== course.id));
    else setCart([...cart, course]);
  };
  const total = cart.reduce((s, c) => s + c.price, 0);
  const savings = cart.reduce((s, c) => s + (c.originalPrice ? c.originalPrice - c.price : 0), 0);

  const handleCheckout = () => {
    setCheckoutStep(false);
    setPurchased(true);
    setCart([]);
    setTimeout(() => { setPurchased(false); setCartOpen(false); }, 3500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080B0F", color: "#E8E6E1", fontFamily: "'Georgia', serif" }}>

      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.4,
      }} />

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,11,15,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a1f2e",
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #D97706, #92400E)",
            borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>🛢️</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "-0.3px", color: "#F5F0E8" }}>
              Vaca Muerta
            </div>
            <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#D97706", marginTop: "-2px" }}>
              ACADEMY
            </div>
          </div>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "relative",
            background: cart.length > 0 ? "linear-gradient(135deg, #D97706, #92400E)" : "#1a1f2e",
            border: "none", borderRadius: "8px",
            padding: "8px 16px",
            color: "#F5F0E8", cursor: "pointer",
            fontSize: "13px", fontFamily: "'Georgia', serif",
            display: "flex", alignItems: "center", gap: "8px",
            transition: "all 0.2s",
          }}
        >
          🛒 Mi carrito
          {cart.length > 0 && (
            <span style={{
              background: "#F5F0E8", color: "#080B0F",
              borderRadius: "50%", width: "18px", height: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", fontWeight: "700",
            }}>{cart.length}</span>
          )}
        </button>
      </header>

      {/* HERO */}
      <section style={{
        padding: "60px 24px 40px",
        maxWidth: "900px", margin: "0 auto",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "inline-block",
          background: "#D97706" + "18",
          border: "1px solid #D97706" + "40",
          color: "#D97706",
          fontSize: "10px", letterSpacing: "3px",
          padding: "5px 12px", borderRadius: "2px",
          marginBottom: "16px",
        }}>
          NEUQUÉN · ARGENTINA · VACA MUERTA
        </div>
        <h1 style={{
          fontSize: "clamp(26px, 6vw, 44px)",
          lineHeight: "1.15",
          color: "#F5F0E8",
          margin: "0 0 16px",
          fontWeight: "700",
          letterSpacing: "-1px",
          maxWidth: "600px",
        }}>
          Formación técnica para entrar y crecer en la industria
        </h1>
        <p style={{ fontSize: "15px", color: "#9CA3AF", maxWidth: "520px", lineHeight: "1.7", margin: "0 0 32px" }}>
          Cursos, guías y herramientas creados por y para técnicos de Vaca Muerta. Electricidad, mecánica, herramientas digitales y desarrollo de carrera.
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[["1.200+", "estudiantes"], ["8", "cursos"], ["100%", "práctico"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#D97706" }}>{n}</div>
              <div style={{ fontSize: "11px", color: "#6B7280", letterSpacing: "1px" }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ padding: "0 24px 24px", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: "7px 16px",
              background: filter === cat ? "#D97706" : "#1a1f2e",
              color: filter === cat ? "#080B0F" : "#9CA3AF",
              border: filter === cat ? "none" : "1px solid #2a2f3e",
              borderRadius: "20px", cursor: "pointer",
              fontSize: "12px", fontFamily: "'Georgia', serif",
              fontWeight: filter === cat ? "700" : "400",
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {/* COURSES GRID */}
      <section style={{ padding: "0 24px 60px", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {filtered.map(course => (
            <div key={course.id} style={{
              background: "#0f1318",
              border: `1px solid ${inCart(course.id) ? course.color + "60" : "#1a1f2e"}`,
              borderRadius: "10px",
              overflow: "hidden",
              transition: "all 0.2s",
              position: "relative",
            }}>
              {/* Card top bar */}
              <div style={{
                height: "4px",
                background: `linear-gradient(90deg, ${course.color}, ${course.color}40)`,
              }} />

              <div style={{ padding: "18px" }}>
                {/* Tag */}
                {course.tag && (
                  <div style={{
                    display: "inline-block",
                    background: course.color + "20",
                    color: course.color,
                    fontSize: "9px", letterSpacing: "2px",
                    padding: "3px 8px", borderRadius: "2px",
                    marginBottom: "10px", fontWeight: "700",
                  }}>{course.tag}</div>
                )}

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                  <div style={{ fontSize: "28px" }}>{course.icon}</div>
                  <div style={{
                    fontSize: "10px", letterSpacing: "1px",
                    color: levelColor[course.level] || "#6B7280",
                    background: (levelColor[course.level] || "#6B7280") + "15",
                    padding: "3px 8px", borderRadius: "2px",
                  }}>{course.level}</div>
                </div>

                <div style={{ fontSize: "11px", color: course.color, letterSpacing: "1px", margin: "10px 0 4px" }}>
                  {course.category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#F5F0E8", margin: "0 0 4px", lineHeight: "1.3" }}>
                  {course.title}
                </h3>
                <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "10px" }}>{course.subtitle}</div>
                <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: "1.6", margin: "0 0 14px" }}>
                  {course.desc}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>⏱ {course.duration}</span>
                  <span style={{ fontSize: "11px", color: "#6B7280" }}>👤 {course.students}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "700", color: "#F5F0E8" }}>
                      ${course.price} USD
                    </span>
                    {course.originalPrice && (
                      <span style={{ fontSize: "12px", color: "#4B5563", textDecoration: "line-through", marginLeft: "6px" }}>
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggle(course)}
                    style={{
                      padding: "8px 14px",
                      background: inCart(course.id) ? "#1a2a1a" : course.color,
                      color: inCart(course.id) ? "#10B981" : "#080B0F",
                      border: inCart(course.id) ? "1px solid #10B981" : "none",
                      borderRadius: "6px", cursor: "pointer",
                      fontSize: "12px", fontFamily: "'Georgia', serif",
                      fontWeight: "700", transition: "all 0.2s",
                    }}
                  >
                    {inCart(course.id) ? "✓ Agregado" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex",
        }}>
          {/* Backdrop */}
          <div
            onClick={() => { setCartOpen(false); setCheckoutStep(false); }}
            style={{ flex: 1, background: "rgba(0,0,0,0.7)" }}
          />
          {/* Drawer */}
          <div style={{
            width: "min(380px, 100vw)",
            background: "#0f1318",
            borderLeft: "1px solid #1a1f2e",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* Drawer header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #1a1f2e",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#F5F0E8" }}>
                  {checkoutStep ? "Checkout" : "Mi carrito"}
                </div>
                {!checkoutStep && <div style={{ fontSize: "12px", color: "#6B7280" }}>{cart.length} curso{cart.length !== 1 ? "s" : ""}</div>}
              </div>
              <button onClick={() => { setCartOpen(false); setCheckoutStep(false); }} style={{
                background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "18px",
              }}>✕</button>
            </div>

            {/* Drawer body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {purchased ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#10B981", marginBottom: "8px" }}>¡Compra exitosa!</div>
                  <div style={{ fontSize: "13px", color: "#9CA3AF" }}>Revisá tu email para acceder a tus cursos.</div>
                </div>
              ) : checkoutStep ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>Completá tus datos para finalizar la compra.</p>
                  {[["Nombre completo", "text"], ["Email", "email"], ["Número de WhatsApp", "text"]].map(([label, type]) => (
                    <div key={label}>
                      <label style={{ fontSize: "11px", color: "#6B7280", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
                        {label.toUpperCase()}
                      </label>
                      <input type={type} style={{
                        width: "100%", background: "#1a1f2e", border: "1px solid #2a2f3e",
                        borderRadius: "6px", padding: "10px 12px", color: "#F5F0E8",
                        fontSize: "13px", fontFamily: "'Georgia', serif", boxSizing: "border-box",
                        outline: "none",
                      }} />
                    </div>
                  ))}
                  <div style={{
                    background: "#1a1f2e", borderRadius: "6px", padding: "14px",
                    marginTop: "8px",
                  }}>
                    <div style={{ fontSize: "11px", color: "#6B7280", letterSpacing: "1px", marginBottom: "10px" }}>
                      MÉTODO DE PAGO
                    </div>
                    {["💳 Tarjeta de crédito/débito", "🏦 Transferencia bancaria", "📱 Mercado Pago"].map(m => (
                      <label key={m} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", cursor: "pointer" }}>
                        <input type="radio" name="payment" style={{ accentColor: "#D97706" }} />
                        <span style={{ fontSize: "13px", color: "#E8E6E1" }}>{m}</span>
                      </label>
                    ))}
                  </div>
                  <div style={{
                    borderTop: "1px solid #1a1f2e", paddingTop: "12px",
                    display: "flex", justifyContent: "space-between",
                  }}>
                    <span style={{ fontSize: "14px", color: "#9CA3AF" }}>Total</span>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#D97706" }}>${total} USD</span>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#4B5563" }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>🛒</div>
                  <div style={{ fontSize: "14px" }}>Tu carrito está vacío</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {cart.map(c => (
                    <div key={c.id} style={{
                      background: "#1a1f2e", borderRadius: "8px", padding: "12px",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}>
                      <span style={{ fontSize: "22px" }}>{c.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#F5F0E8", marginBottom: "2px" }}>{c.title}</div>
                        <div style={{ fontSize: "11px", color: "#6B7280" }}>{c.category} · {c.duration}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "#D97706" }}>${c.price}</div>
                        <button onClick={() => toggle(c)} style={{
                          background: "none", border: "none", color: "#4B5563", cursor: "pointer", fontSize: "11px",
                        }}>Quitar</button>
                      </div>
                    </div>
                  ))}

                  {savings > 0 && (
                    <div style={{
                      background: "#10B981" + "15", border: "1px solid #10B981" + "30",
                      borderRadius: "6px", padding: "10px 12px",
                      fontSize: "12px", color: "#10B981",
                    }}>
                      🎉 Ahorrás <strong>${savings} USD</strong> con los precios de lanzamiento
                    </div>
                  )}

                  <div style={{ borderTop: "1px solid #1a1f2e", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#9CA3AF" }}>Total</span>
                    <span style={{ fontSize: "22px", fontWeight: "700", color: "#D97706" }}>${total} USD</span>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer footer */}
            {!purchased && (
              <div style={{ padding: "16px 24px", borderTop: "1px solid #1a1f2e" }}>
                {cart.length > 0 && (
                  checkoutStep ? (
                    <button onClick={handleCheckout} style={{
                      width: "100%", padding: "14px",
                      background: "linear-gradient(135deg, #D97706, #92400E)",
                      color: "#F5F0E8", border: "none", borderRadius: "8px",
                      cursor: "pointer", fontSize: "14px",
                      fontFamily: "'Georgia', serif", fontWeight: "700",
                      letterSpacing: "0.5px",
                    }}>
                      ✓ Confirmar compra — ${total} USD
                    </button>
                  ) : (
                    <button onClick={() => setCheckoutStep(true)} style={{
                      width: "100%", padding: "14px",
                      background: "linear-gradient(135deg, #D97706, #92400E)",
                      color: "#F5F0E8", border: "none", borderRadius: "8px",
                      cursor: "pointer", fontSize: "14px",
                      fontFamily: "'Georgia', serif", fontWeight: "700",
                    }}>
                      Ir al checkout →
                    </button>
                  )
                )}
                <button onClick={() => { setCartOpen(false); setCheckoutStep(false); }} style={{
                  width: "100%", marginTop: "8px", padding: "10px",
                  background: "none", border: "1px solid #1a1f2e", borderRadius: "8px",
                  color: "#6B7280", cursor: "pointer", fontSize: "13px",
                  fontFamily: "'Georgia', serif",
                }}>
                  Seguir explorando
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING CART BUTTON (mobile) */}
      {cart.length > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "fixed", bottom: "24px", right: "24px", zIndex: 150,
            background: "linear-gradient(135deg, #D97706, #92400E)",
            border: "none", borderRadius: "50px",
            padding: "12px 20px",
            color: "#F5F0E8", cursor: "pointer",
            fontSize: "13px", fontFamily: "'Georgia', serif", fontWeight: "700",
            boxShadow: "0 8px 32px rgba(217,119,6,0.4)",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          🛒 {cart.length} curso{cart.length !== 1 ? "s" : ""} · ${total} USD
        </button>
      )}

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #1a1f2e",
        padding: "24px",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ fontSize: "13px", color: "#6B7280" }}>
          © 2025 Vaca Muerta Academy · Rincón de los Sauces, Neuquén
        </div>
        <div style={{ fontSize: "11px", color: "#374151", marginTop: "4px", letterSpacing: "1px" }}>
          ELECTRICIDAD · MECÁNICA · HERRAMIENTAS · CARRERA
        </div>
      </footer>
    </div>
  );
}
