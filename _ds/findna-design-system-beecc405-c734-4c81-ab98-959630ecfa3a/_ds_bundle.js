/* @ds-bundle: {"format":4,"namespace":"FinDNADesignSystem_beecc4","components":[{"name":"QuickAction","sourcePath":"components/actions/QuickAction.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"BalanceCard","sourcePath":"components/cards/BalanceCard.jsx"},{"name":"FlowStat","sourcePath":"components/finance/FlowStat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Icon","sourcePath":"components/foundation/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/foundation/Icon.jsx"},{"name":"ListItem","sourcePath":"components/lists/ListItem.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Badge","sourcePath":"components/tags/Badge.jsx"},{"name":"Chip","sourcePath":"components/tags/Chip.jsx"}],"sourceHashes":{"components/actions/QuickAction.jsx":"ab3dd7e1aae8","components/buttons/Button.jsx":"0e63da4a798f","components/cards/BalanceCard.jsx":"c6e68621093d","components/finance/FlowStat.jsx":"32764bef7cfe","components/forms/Input.jsx":"9bfc55f4de80","components/foundation/Icon.jsx":"7a151e629e99","components/lists/ListItem.jsx":"6d9c6ccad83c","components/navigation/NavBar.jsx":"1c2c1c2b7998","components/tags/Badge.jsx":"9209f8ad8e8c","components/tags/Chip.jsx":"5086894ba25f","ui_kits/alinma-app/App.jsx":"538799e0eaed","ui_kits/alinma-app/BeneficiariesScreen.jsx":"7f7dfa6c706d","ui_kits/alinma-app/HomeScreen.jsx":"f943e4f9ebfc","ui_kits/alinma-app/StatementScreen.jsx":"d2ae20351db1","ui_kits/alinma-app/TransferScreen.jsx":"adef4d216503","ui_kits/alinma-app/ios-frame.jsx":"be3343be4b51"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FinDNADesignSystem_beecc4 = window.FinDNADesignSystem_beecc4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANT_STYLE = {
  primary: {
    background: 'var(--primary)',
    color: '#fff'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--primary)',
    border: '1.5px solid var(--primary)'
  },
  soft: {
    background: 'var(--primary-100)',
    color: 'var(--primary-700)'
  },
  copper: {
    background: 'var(--copper)',
    color: '#fff'
  }
};
const HOVER_STYLE = {
  primary: {
    background: 'var(--primary-600)'
  },
  ghost: {
    background: 'var(--primary-50)'
  },
  soft: {},
  copper: {
    filter: 'brightness(1.06)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pad = size === 'sm' ? '9px 16px' : '13px 22px';
  const fontSize = size === 'sm' ? 13 : 15;
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      fontFamily: 'var(--font-arabic)',
      fontWeight: 700,
      fontSize,
      border: 0,
      borderRadius: 14,
      padding: pad,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: '.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      opacity: disabled ? 0.45 : 1,
      ...VARIANT_STYLE[variant],
      ...(hover && !disabled ? HOVER_STYLE[variant] : {}),
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/BalanceCard.jsx
try { (() => {
function BalanceCard({
  label = 'الرصيد الحالي',
  amount = '0',
  currency = 'SAR',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: 20,
      textAlign: 'center',
      boxShadow: 'var(--sh-sm)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-2)',
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 800,
      color: 'var(--ink)',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fd-num"
  }, amount), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 15,
      color: 'var(--text-3)',
      marginInlineStart: 5
    }
  }, currency)));
}
Object.assign(__ds_scope, { BalanceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BalanceCard.jsx", error: String((e && e.message) || e) }); }

// components/finance/FlowStat.jsx
try { (() => {
const TONE_COLOR = {
  in: 'var(--success)',
  out: 'var(--danger)',
  neutral: 'var(--ink)'
};
const TONE_BORDER = {
  in: 'var(--success)',
  out: 'var(--danger)',
  neutral: 'var(--primary)'
};
function FlowStat({
  label,
  value,
  tone = 'neutral',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderInlineStart: `3px solid ${TONE_BORDER[tone]}`,
      paddingInlineStart: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-2)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "fd-num",
    style: {
      fontSize: 19,
      fontWeight: 800,
      marginTop: 2,
      color: TONE_COLOR[tone]
    }
  }, value));
}
Object.assign(__ds_scope, { FlowStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/finance/FlowStat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  placeholder,
  value,
  onChange,
  focused = false,
  style,
  ...rest
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const active = focused || isFocused;
  return /*#__PURE__*/React.createElement("input", _extends({
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    style: {
      background: 'var(--surface)',
      border: `1.5px solid ${active ? 'var(--primary)' : 'var(--line)'}`,
      borderRadius: 14,
      padding: '14px 16px',
      fontSize: 14,
      color: 'var(--text)',
      fontFamily: 'var(--font-arabic)',
      width: '100%',
      fontWeight: 500,
      outline: 0,
      transition: '.15s',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Icon.jsx
try { (() => {
// Path data copied verbatim from assets/icons/*.svg (sourced from the FinDNA
// hackathon mockup) — 24x24 viewBox, 2px stroke, round caps/joins, no fill.
const PATHS = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  transfer: '<path d="M7 16l-4-4 4-4M17 8l4 4-4 4"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
  statement: '<path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16l-4-3-4 3-4-3z"/>',
  beneficiary: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0116 0v1"/>',
  government: '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  verified: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  international: '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20"/>',
  notification: '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
  servicesGrid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  statementCheck: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2 4-4"/>'
};
function Icon({
  name = 'home',
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) {
  const inner = PATHS[name] || PATHS.home;
  return React.createElement('svg', {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style,
    dangerouslySetInnerHTML: {
      __html: inner
    },
    ...rest
  });
}
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/QuickAction.jsx
try { (() => {
function QuickAction({
  icon = 'transfer',
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      cursor: onClick ? 'pointer' : 'default'
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 15,
      background: 'var(--primary)',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      boxShadow: 'var(--sh-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, label));
}
Object.assign(__ds_scope, { QuickAction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/QuickAction.jsx", error: String((e && e.message) || e) }); }

// components/lists/ListItem.jsx
try { (() => {
function ListItem({
  icon = 'transfer',
  label,
  chevron = true,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'var(--surface)',
      borderRadius: 'var(--r-md)',
      padding: '15px 16px',
      marginBottom: 8,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      color: 'var(--ink)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink)',
      flex: 1
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-3)'
    }
  }, "\u2039"));
}
Object.assign(__ds_scope, { ListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/ListItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  items,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '12px 8px',
      boxShadow: 'var(--sh-sm)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: it.onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      color: it.active ? 'var(--primary)' : 'var(--text-3)',
      cursor: it.onClick ? 'pointer' : 'default'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 600
    }
  }, it.label))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/tags/Badge.jsx
try { (() => {
const TONE_STYLE = {
  new: {
    background: 'var(--copper)',
    color: '#fff'
  },
  ok: {
    background: 'rgba(61,191,143,.15)',
    color: 'var(--success)'
  },
  warn: {
    background: 'rgba(224,164,94,.18)',
    color: 'var(--copper)'
  }
};
function Badge({
  tone = 'new',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      padding: '3px 10px',
      borderRadius: 'var(--r-pill)',
      display: 'inline-block',
      ...TONE_STYLE[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tags/Badge.jsx", error: String((e && e.message) || e) }); }

// components/tags/Chip.jsx
try { (() => {
function Chip({
  active = false,
  children,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      fontSize: 12,
      fontWeight: 700,
      padding: '6px 14px',
      borderRadius: 'var(--r-pill)',
      border: `1px solid ${active ? 'var(--primary)' : 'var(--line)'}`,
      color: active ? '#fff' : 'var(--text-2)',
      background: active ? 'var(--primary)' : 'var(--surface)',
      cursor: onClick ? 'pointer' : 'default',
      display: 'inline-block',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tags/Chip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/App.jsx
try { (() => {
const {
  NavBar
} = window.FinDNADesignSystem_beecc4;
function AlinmaApp() {
  const HomeScreen = window.HomeScreen;
  const TransferScreen = window.TransferScreen;
  const StatementScreen = window.StatementScreen;
  const BeneficiariesScreen = window.BeneficiariesScreen;
  const [tab, setTab] = React.useState('home');
  const [amount, setAmount] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const screens = {
    home: /*#__PURE__*/React.createElement(HomeScreen, null),
    transfer: /*#__PURE__*/React.createElement(TransferScreen, {
      amount: amount,
      setAmount: setAmount,
      selected: selected,
      setSelected: setSelected
    }),
    statement: /*#__PURE__*/React.createElement(StatementScreen, null),
    beneficiaries: /*#__PURE__*/React.createElement(BeneficiariesScreen, null)
  };
  return /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, screens[tab]), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px 4px'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    items: [{
      icon: 'home',
      label: 'الرئيسية',
      active: tab === 'home',
      onClick: () => setTab('home')
    }, {
      icon: 'transfer',
      label: 'التحويل',
      active: tab === 'transfer',
      onClick: () => setTab('transfer')
    }, {
      icon: 'statementCheck',
      label: 'المتابعة',
      active: tab === 'statement',
      onClick: () => setTab('statement')
    }, {
      icon: 'beneficiary',
      label: 'المستفيدون',
      active: tab === 'beneficiaries',
      onClick: () => setTab('beneficiaries')
    }]
  })));
}
window.AlinmaApp = AlinmaApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/BeneficiariesScreen.jsx
try { (() => {
const {
  ListItem,
  Chip,
  Button
} = window.FinDNADesignSystem_beecc4;
function BeneficiariesScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--ink)'
    }
  }, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u0641\u064A\u062F\u064A\u0646"), /*#__PURE__*/React.createElement(Button, {
    variant: "soft",
    size: "sm"
  }, "\u0625\u0636\u0627\u0641\u0629")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    active: true
  }, "\u0627\u0644\u0643\u0644"), /*#__PURE__*/React.createElement(Chip, null, "\u0645\u062D\u0644\u064A"), /*#__PURE__*/React.createElement(Chip, null, "\u062F\u0648\u0644\u064A")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ListItem, {
    icon: "beneficiary",
    label: "\u0645\u062D\u0645\u062F \u0627\u0644\u0639\u062A\u064A\u0628\u064A"
  }), /*#__PURE__*/React.createElement(ListItem, {
    icon: "beneficiary",
    label: "\u0633\u0627\u0631\u0629 \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A"
  }), /*#__PURE__*/React.createElement(ListItem, {
    icon: "international",
    label: "Ahmed \u2014 \u0628\u0646\u0643 \u062F\u0648\u0644\u064A"
  }), /*#__PURE__*/React.createElement(ListItem, {
    icon: "government",
    label: "\u0641\u0627\u062A\u0648\u0631\u0629 \u0643\u0647\u0631\u0628\u0627\u0621"
  })));
}
window.BeneficiariesScreen = BeneficiariesScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/BeneficiariesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/HomeScreen.jsx
try { (() => {
const {
  BalanceCard,
  QuickAction,
  ListItem,
  Chip,
  Button
} = window.FinDNADesignSystem_beecc4;
function HomeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-2)',
      fontWeight: 500
    }
  }, "\u0645\u0633\u0627\u0621 \u0627\u0644\u062E\u064A\u0631"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      color: 'var(--ink)',
      letterSpacing: '-0.5px',
      marginTop: 2
    }
  }, "\u0645\u0631\u062D\u0628\u0627\u064B \u0639\u0628\u062F\u0627\u0644\u0644\u0647")), /*#__PURE__*/React.createElement(BalanceCard, {
    label: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A",
    amount: "5,000",
    currency: "SAR"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      justifyContent: 'space-around'
    }
  }, /*#__PURE__*/React.createElement(QuickAction, {
    icon: "transfer",
    label: "\u062A\u062D\u0648\u064A\u0644"
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "card",
    label: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A"
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "statement",
    label: "\u0643\u0634\u0641"
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "beneficiary",
    label: "\u0645\u0633\u062A\u0641\u064A\u062F"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: 'var(--ink)'
    }
  }, "\u0639\u0645\u0644\u064A\u0627\u062A \u0623\u062E\u064A\u0631\u0629"), /*#__PURE__*/React.createElement(Button, {
    variant: "soft",
    size: "sm"
  }, "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644")), /*#__PURE__*/React.createElement(ListItem, {
    icon: "transfer",
    label: "\u062A\u062D\u0648\u064A\u0644 \u0625\u0644\u0649 \u0645\u062D\u0645\u062F \u0627\u0644\u0639\u062A\u064A\u0628\u064A"
  }), /*#__PURE__*/React.createElement(ListItem, {
    icon: "government",
    label: "\u0633\u062F\u0627\u062F \u0641\u0627\u062A\u0648\u0631\u0629 \u0643\u0647\u0631\u0628\u0627\u0621"
  }), /*#__PURE__*/React.createElement(ListItem, {
    icon: "card",
    label: "\u0645\u0634\u062A\u0631\u064A\u0627\u062A \u2014 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0625\u0646\u0645\u0627\u0621"
  })));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/StatementScreen.jsx
try { (() => {
const {
  FlowStat,
  ListItem,
  Badge,
  Chip
} = window.FinDNADesignSystem_beecc4;
function StatementScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--ink)'
    }
  }, "\u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0628"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    active: true
  }, "\u064A\u0648\u0646\u064A\u0648"), /*#__PURE__*/React.createElement(Chip, null, "\u0645\u0627\u064A\u0648"), /*#__PURE__*/React.createElement(Chip, null, "\u0623\u0628\u0631\u064A\u0644")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FlowStat, {
    label: "\u0627\u0644\u062A\u062F\u0641\u0642\u0627\u062A \u0627\u0644\u062F\u0627\u062E\u0644\u0629",
    value: "8,902",
    tone: "in"
  }), /*#__PURE__*/React.createElement(FlowStat, {
    label: "\u0627\u0644\u062A\u062F\u0641\u0642\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u0629",
    value: "9,370",
    tone: "out"
  }), /*#__PURE__*/React.createElement(FlowStat, {
    label: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D\u064A",
    value: "5,862",
    tone: "neutral"
  }), /*#__PURE__*/React.createElement(FlowStat, {
    label: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062E\u062A\u0627\u0645\u064A",
    value: "6,329",
    tone: "neutral"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--text-2)',
      marginBottom: 8
    }
  }, "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'var(--surface)',
      borderRadius: 'var(--r-md)',
      padding: '15px 16px',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink)',
      flex: 1
    }
  }, "\u0631\u0627\u062A\u0628 \u2014 \u064A\u0648\u0646\u064A\u0648"), /*#__PURE__*/React.createElement(Badge, {
    tone: "ok"
  }, "\u0645\u0624\u0647\u0651\u0644")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'var(--surface)',
      borderRadius: 'var(--r-md)',
      padding: '15px 16px',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink)',
      flex: 1
    }
  }, "\u0642\u0633\u0637 \u062A\u0645\u0648\u064A\u0644"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "\u0628\u062D\u0627\u062C\u0629 \u062F\u0641\u0639\u0629")), /*#__PURE__*/React.createElement(ListItem, {
    icon: "statement",
    label: "\u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 PDF"
  })));
}
window.StatementScreen = StatementScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/StatementScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/TransferScreen.jsx
try { (() => {
const {
  Input,
  Button,
  ListItem,
  Icon
} = window.FinDNADesignSystem_beecc4;
function TransferScreen({
  amount,
  setAmount,
  selected,
  setSelected
}) {
  const beneficiaries = [{
    id: 1,
    name: 'محمد العتيبي',
    icon: 'beneficiary'
  }, {
    id: 2,
    name: 'سارة القحطاني',
    icon: 'beneficiary'
  }, {
    id: 3,
    name: 'مستفيد جديد',
    icon: 'international'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--ink)'
    }
  }, "\u0627\u0644\u062D\u0648\u0627\u0644\u0627\u062A"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u0627\u0644\u0628\u062D\u062B \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0633\u0645 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--text-2)',
      marginBottom: 8
    }
  }, "\u0645\u0633\u062A\u0641\u064A\u062F \u0627\u0644\u0625\u0646\u0645\u0627\u0621"), beneficiaries.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    onClick: () => setSelected(b.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: selected === b.id ? 'var(--primary-50)' : 'var(--surface)',
      border: selected === b.id ? '1.5px solid var(--primary)' : '1px solid transparent',
      borderRadius: 'var(--r-md)',
      padding: '13px 16px',
      marginBottom: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: b.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink)',
      flex: 1
    }
  }, b.name), selected === b.id && /*#__PURE__*/React.createElement(Icon, {
    name: "verified",
    size: 20,
    color: "var(--primary)"
  })))), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A",
    value: amount,
    onChange: e => setAmount(e.target.value),
    focused: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    style: {
      justifyContent: 'center'
    },
    disabled: !selected
  }, "\u062A\u062D\u0648\u064A\u0644 ", amount ? `${amount} SAR` : ''));
}
window.TransferScreen = TransferScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/TransferScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/alinma-app/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/alinma-app/ios-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.QuickAction = __ds_scope.QuickAction;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.BalanceCard = __ds_scope.BalanceCard;

__ds_ns.FlowStat = __ds_scope.FlowStat;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

})();
