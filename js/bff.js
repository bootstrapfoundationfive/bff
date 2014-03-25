/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.abide = {
    name : 'abide',

    version : '5.2.1',

    settings : {
      live_validate : true,
      focus_on_invalid : true,
      error_labels: true, // labels with a for="inputId" will recieve an `error` class
      timeout : 1000,
      patterns : {
        alpha: /^[a-zA-Z]+$/,
        alpha_numeric : /^[a-zA-Z0-9]+$/,
        integer: /^\d+$/,
        number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,

        // amex, visa, diners
        card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        cvv : /^([0-9]){3,4}$/,

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

        url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,
        // abc.de
        domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,

        datetime: /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,
        // YYYY-MM-DD
        date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
        // HH:MM:SS
        time : /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,
        dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
        // MM/DD/YYYY
        month_day_year : /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,

        // #FFF or #FFFFFF
        color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      },
      validators : {
        equalTo: function(el, required, parent) {
          var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
              to    = el.value,
              valid = (from === to);

          return valid;
        }
      }
    },

    timer : null,

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          form = self.S(scope).attr('novalidate', 'novalidate'),
          settings = form.data(this.attr_name(true) + '-init');

      this.invalid_attr = this.add_namespace('data-invalid');

      form
        .off('.abide')
        .on('submit.fndtn.abide validate.fndtn.abide', function (e) {
          var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
          return self.validate(self.S(this).find('input, textarea, select').get(), e, is_ajax);
        })
        .on('reset', function() {
          return self.reset($(this));
        })
        .find('input, textarea, select')
          .off('.abide')
          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
            self.validate([this], e);
          })
          .on('keydown.fndtn.abide', function (e) {
            var settings = $(this).closest('form').data(self.attr_name(true) + '-init');
            if (settings.live_validate === true) {
              clearTimeout(self.timer);
              self.timer = setTimeout(function () {
                self.validate([this], e);
              }.bind(this), settings.timeout);
            }
          });
    },

    reset : function (form) {
      form.removeAttr(this.invalid_attr);
      $(this.invalid_attr, form).removeAttr(this.invalid_attr);
      $('.error', form).not('small').removeClass('error');
    },

    validate : function (els, e, is_ajax) {
      var validations = this.parse_patterns(els),
          validation_count = validations.length,
          form = this.S(els[0]).closest('form'),
          submit_event = /submit/.test(e.type);

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < validation_count; i++) {
        if (!validations[i] && (submit_event || is_ajax)) {
          if (this.settings.focus_on_invalid) els[i].focus();
          form.trigger('invalid');
          this.S(els[i]).closest('form').attr(this.invalid_attr, '');
          return false;
        }
      }

      if (submit_event || is_ajax) {
        form.trigger('valid');
      }

      form.removeAttr(this.invalid_attr);

      if (is_ajax) return false;

      return true;
    },

    parse_patterns : function (els) {
      var i = els.length,
          el_patterns = [];

      while (i--) {
        el_patterns.push(this.pattern(els[i]));
      }

      return this.check_validation_and_apply_styles(el_patterns);
    },

    pattern : function (el) {
      var type = el.getAttribute('type'),
          required = typeof el.getAttribute('required') === 'string';

      var pattern = el.getAttribute('pattern') || '';

      if (this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
        return [el, this.settings.patterns[pattern], required];
      } else if (pattern.length > 0) {
        return [el, new RegExp(pattern), required];
      }

      if (this.settings.patterns.hasOwnProperty(type)) {
        return [el, this.settings.patterns[type], required];
      }

      pattern = /.*/;

      return [el, pattern, required];
    },

    check_validation_and_apply_styles : function (el_patterns) {
      var i = el_patterns.length,
          validations = [];

      while (i--) {
        var el = el_patterns[i][0],
            required = el_patterns[i][2],
            value = el.value,
            direct_parent = this.S(el).parent(),
            validator = el.getAttribute(this.add_namespace('data-abide-validator')),
            is_radio = el.type === "radio",
            is_checkbox = el.type === "checkbox",
            label = this.S('label[for="' + el.getAttribute('id') + '"]'),
            valid_length = (required) ? (el.value.length > 0) : true;

        var parent, valid;

        // support old way to do equalTo validations
        if(el.getAttribute(this.add_namespace('data-equalto'))) { validator = "equalTo" }

        if (!direct_parent.is('label')) {
          parent = direct_parent;
        } else {
          parent = direct_parent.parent();
        }

        if (is_radio && required) {
          validations.push(this.valid_radio(el, required));
        } else if (is_checkbox && required) {
          validations.push(this.valid_checkbox(el, required));
        } else if (validator) {
          valid = this.settings.validators[validator].apply(this, [el, required, parent])
          validations.push(valid);

          if (valid) {
            this.S(el).removeAttr(this.invalid_attr);
            parent.removeClass('error');
          } else {
            this.S(el).attr(this.invalid_attr, '');
            parent.addClass('error');
          }
        } else {

          if (el_patterns[i][1].test(value) && valid_length ||
            !required && el.value.length < 1 || $(el).attr('disabled')) {
            this.S(el).removeAttr(this.invalid_attr);
            parent.removeClass('error');
            if (label.length > 0 && this.settings.error_labels) label.removeClass('error');

            validations.push(true);
            $(el).triggerHandler('valid');
          } else {
            this.S(el).attr(this.invalid_attr, '');
            parent.addClass('error');
            if (label.length > 0 && this.settings.error_labels) label.addClass('error');

            validations.push(false);
            $(el).triggerHandler('invalid');
          }
        }
      }

      return validations;
    },

    valid_checkbox : function(el, required) {
      var el = this.S(el),
          valid = (el.is(':checked') || !required);

      if (valid) {
        el.removeAttr(this.invalid_attr).parent().removeClass('error');
      } else {
        el.attr(this.invalid_attr, '').parent().addClass('error');
      }

      return valid;
    },

    valid_radio : function (el, required) {
      var name = el.getAttribute('name'),
          group = document.getElementsByName(name),
          count = group.length,
          valid = false;

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < count; i++) {
        if (group[i].checked) valid = true;
      }

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < count; i++) {
        if (valid) {
          this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass('error');
        } else {
          this.S(group[i]).attr(this.invalid_attr, '').parent().addClass('error');
        }
      }

      return valid;
    }
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      toggleable: true
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this;
      var S = this.S;
      S(this.scope)
      .off('.fndtn.accordion')
      .on('click.fndtn.accordion', '[' + this.attr_name() + '] dd > a', function (e) {
        var accordion = S(this).closest('[' + self.attr_name() + ']'),
            target = S('#' + this.href.split('#')[1]),
            siblings = S('dd > .content', accordion),
            aunts = $('> dd', accordion),
            settings = accordion.data(self.attr_name(true) + '-init'),
            active_content = S('dd > .content.' + settings.active_class, accordion),
            active_parent = S('dd.' + settings.active_class, accordion);
        e.preventDefault();

        if (! S(this).closest('dl').is(accordion)) { return; }

        if (active_content[0] == target[0] && settings.toggleable) {
          active_parent.toggleClass(settings.active_class, false);
          return target.toggleClass(settings.active_class, false);
        }

        siblings.removeClass(settings.active_class);
        aunts.removeClass(settings.active_class);
        target.addClass(settings.active_class).parent().addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '5.2.1',

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] a.close', function (e) {
          var alertBox = S(this).closest('[' + self.attr_name() + ']'),
              settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          S(this).trigger('close').remove();
          settings.callback();
        });
      });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.clearing = {
    name : 'clearing',

    version: '5.2.1',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
          '<a href="#" class="clearing-main-next"><span></span></a></div>'
      },

      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : '.clearing-close',

      touch_label : '&larr;&nbsp;Swipe to Advance&nbsp;&rarr;',

      // event initializers and locks
      init : false,
      locked : false
    },

    init : function (scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'throttle image_loaded');

      this.bindings(method, options);

      if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
        this.assemble(self.S('li', this.scope));
      } else {
        self.S('[' + this.attr_name() + ']', this.scope).each(function () {
          self.assemble(self.S('li', this));
        });
      }
    },

    events : function (scope) {
      var self = this,
      S = self.S;

      if ($('.scroll-container').length > 0) {
        this.scope = $('.scroll-container');
      }

      S(this.scope)
        .off('.clearing')
        .on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li',
          function (e, current, target) {
            var current = current || S(this),
                target = target || current,
                next = current.next('li'),
                settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
                image = S(e.target);

            e.preventDefault();

            if (!settings) {
              self.init();
              settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
            }

            // if clearing is open and the current image is
            // clicked, go to the next image in sequence
            if (target.hasClass('visible') &&
              current[0] === target[0] &&
              next.length > 0 && self.is_open(current)) {
              target = next;
              image = S('img', target);
            }

            // set current and target to the clicked li if not otherwise defined.
            self.open(image, current, target);
            self.update_paddles(target);
          })

        .on('click.fndtn.clearing', '.clearing-main-next',
          function (e) { self.nav(e, 'next') })
        .on('click.fndtn.clearing', '.clearing-main-prev',
          function (e) { self.nav(e, 'prev') })
        .on('click.fndtn.clearing', this.settings.close_selectors,
          function (e) { Foundation.libs.clearing.close(e, this) });

      $(document).on('keydown.fndtn.clearing',
          function (e) { self.keydown(e) });

      S(window).off('.clearing').on('resize.fndtn.clearing',
        function () { self.resize() });

      this.swipe_events(scope);
    },

    swipe_events : function (scope) {
      var self = this,
      S = self.S;

      S(this.scope)
        .on('touchstart.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          var data = {
                start_page_x: e.touches[0].pageX,
                start_page_y: e.touches[0].pageY,
                start_time: (new Date()).getTime(),
                delta_x: 0,
                is_scrolling: undefined
              };

          S(this).data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = S(this).data('swipe-transition');

          if (typeof data === 'undefined') {
            data = {};
          }

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? 'next' : 'prev';
            data.active = true;
            self.nav(e, direction);
          }
        })
        .on('touchend.fndtn.clearing', '.visible-img', function(e) {
          S(this).data('swipe-transition', {});
          e.stopPropagation();
        });
    },

    assemble : function ($li) {
      var $el = $li.parent();

      if ($el.parent().hasClass('carousel')) return;
      $el.after('<div id="foundationClearingHolder"></div>');

      var holder = this.S('#foundationClearingHolder'),
          settings = $el.data(this.attr_name(true) + '-init'),
          grid = $el.detach(),
          data = {
            grid: '<div class="carousel">' + grid[0].outerHTML + '</div>',
            viewing: settings.templates.viewing
          },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
            data.grid + '</div></div>',
          touch_label = this.settings.touch_label;

      if (Modernizr.touch) {
        wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
      }

      holder.after(wrapper).remove();
    },

    open : function ($image, current, target) {
      var self = this,
          body = $(document.body),
          root = target.closest('.clearing-assembled'),
          container = $('div', root).first(),
          visible_image = $('.visible-img', container),
          image = $('img', visible_image).not($image),
          label = $('.clearing-touch-label', '.clearing-blackout'),
          error = false;

      image.error(function () {
        error = true;
      });

      function startLoad() {
        setTimeout(function () {
          this.image_loaded(image, function () {
            if (image.outerWidth() === 1 && !error) {
              startLoad.call(this);
            } else {
              cb.call(this, image);
            }
          }.bind(this));
        }.bind(this), 50);
      }

      function cb (image) {
        var $image = $(image);
        image.css('visibility', 'visible');
        // toggle the gallery
        body.css('overflow', 'hidden');
        root.addClass('clearing-blackout');
        container.addClass('clearing-container');
        visible_image.show();
        this.fix_height(target)
          .caption(self.S('.clearing-caption', visible_image), self.S('img', target))
          .center_and_label(image, label)
          .shift(current, target, function () {
            target.siblings().removeClass('visible');
            target.addClass('visible');
          });
      }

      if (!this.locked()) {
        // set the image to the selected thumbnail
        image
          .attr('src', this.load($image))
          .css('visibility', 'hidden');

        startLoad.call(this);

      }
    },

    close : function (e, el) {
      e.preventDefault();

      var root = (function (target) {
            if (/blackout/.test(target.selector)) {
              return target;
            } else {
              return target.closest('.clearing-blackout');
            }
          }($(el))),
          body = $(document.body), container, visible_image;

      if (el === e.target && root) {
        body.css('overflow', '');
        container = $('div', root).first();
        visible_image = $('.visible-img', container);
        this.settings.prev_index = 0;
        $('ul[' + this.attr_name() + ']', root)
          .attr('style', '').closest('.clearing-blackout')
          .removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
      }

      return false;
    },

    is_open : function (current) {
      return current.parent().prop('style').length > 0;
    },

    keydown : function (e) {
      var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
          NEXT_KEY = this.rtl ? 37 : 39,
          PREV_KEY = this.rtl ? 39 : 37,
          ESC_KEY = 27;

      if (e.which === NEXT_KEY) this.go(clearing, 'next');
      if (e.which === PREV_KEY) this.go(clearing, 'prev');
      if (e.which === ESC_KEY) this.S('a.clearing-close').trigger('click');
    },

    nav : function (e, direction) {
      var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');

      e.preventDefault();
      this.go(clearing, direction);
    },

    resize : function () {
      var image = $('img', '.clearing-blackout .visible-img'),
          label = $('.clearing-touch-label', '.clearing-blackout');

      if (image.length) {
        this.center_and_label(image, label);
      }
    },

    // visual adjustments
    fix_height : function (target) {
      var lis = target.parent().children(),
          self = this;

      lis.each(function () {
          var li = self.S(this),
              image = li.find('img');

          if (li.height() > image.outerHeight()) {
            li.addClass('fix-height');
          }
        })
        .closest('ul')
        .width(lis.length * 100 + '%');

      return this;
    },

    update_paddles : function (target) {
      var visible_image = target
        .closest('.carousel')
        .siblings('.visible-img');

      if (target.next().length > 0) {
        this.S('.clearing-main-next', visible_image)
          .removeClass('disabled');
      } else {
        this.S('.clearing-main-next', visible_image)
          .addClass('disabled');
      }

      if (target.prev().length > 0) {
        this.S('.clearing-main-prev', visible_image)
          .removeClass('disabled');
      } else {
        this.S('.clearing-main-prev', visible_image)
          .addClass('disabled');
      }
    },

    center_and_label : function (target, label) {
      if (!this.rtl) {
        target.css({
          marginLeft : -(target.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2)
        });

        if (label.length > 0) {
          label.css({
            marginLeft : -(label.outerWidth() / 2),
            marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10
          });
        }
      } else {
        target.css({
          marginRight : -(target.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2),
          left: 'auto',
          right: '50%'
        });

        if (label.length > 0) {
          label.css({
            marginRight : -(label.outerWidth() / 2),
            marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10,
            left: 'auto',
            right: '50%'
          });
        }
      }
      return this;
    },

    // image loading and preloading

    load : function ($image) {
      if ($image[0].nodeName === "A") {
        var href = $image.attr('href');
      } else {
        var href = $image.parent().attr('href');
      }

      this.preload($image);

      if (href) return href;
      return $image.attr('src');
    },

    preload : function ($image) {
      this
        .img($image.closest('li').next())
        .img($image.closest('li').prev());
    },

    img : function (img) {
      if (img.length) {
        var new_img = new Image(),
            new_a = this.S('a', img);

        if (new_a.length) {
          new_img.src = new_a.attr('href');
        } else {
          new_img.src = this.S('img', img).attr('src');
        }
      }
      return this;
    },

    // image caption

    caption : function (container, $image) {
      var caption = $image.attr('data-caption');

      if (caption) {
        container
          .html(caption)
          .show();
      } else {
        container
          .text('')
          .hide();
      }
      return this;
    },

    // directional methods

    go : function ($ul, direction) {
      var current = this.S('.visible', $ul),
          target = current[direction]();

      if (target.length) {
        this.S('img', target)
          .trigger('click', [current, target]);
      }
    },

    shift : function (current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          dir = this.rtl ? 'right' : 'left',
          left = parseInt(clearing.css('left'), 10),
          width = target.outerWidth(),
          skip_shift;

      var dir_obj = {};

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      // needs support for RTL **
      if (target.index() !== old_index && !/skip/.test(direction)){
        if (/left/.test(direction)) {
          this.lock();
          dir_obj[dir] = left + width;
          clearing.animate(dir_obj, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          dir_obj[dir] = left - width;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          dir_obj[dir] = -(skip_shift * width);
          clearing.animate(dir_obj, 300, this.unlock());
        } else {
          dir_obj[dir] = 0;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      }

      callback();
    },

    direction : function ($el, current, target) {
      var lis = this.S('li', $el),
          li_width = lis.outerWidth() + (lis.outerWidth() / 4),
          up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
          target_index = lis.index(target),
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if ((target_index > up_count)
          && target_index > this.settings.prev_index) {
          response = 'right';
        } else if ((target_index > up_count - 1)
          && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;

      return response;
    },

    adjacent : function (current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) return true;
      }
      return false;
    },

    // lock management

    lock : function () {
      this.settings.locked = true;
    },

    unlock : function () {
      this.settings.locked = false;
    },

    locked : function () {
      return this.settings.locked;
    },

    off : function () {
      this.S(this.scope).off('.fndtn.clearing');
      this.S(window).off('.fndtn.clearing');
    },

    reflow : function () {
      this.init();
    }
  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.2.1',

    settings : {
      active_class: 'open',
      align: 'bottom',
      is_hover: false,
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
          e.preventDefault();
          if (!settings.is_hover || Modernizr.touch) self.toggle(S(this));
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          clearTimeout(self.timeout);

          if ($this.data(self.data_attr())) {
            var dropdown = S('#' + $this.data(self.data_attr())),
                target = $this;
          } else {
            var dropdown = $this;
                target = S("[" + self.attr_name() + "='" + dropdown.attr('id') + "']");
          }

          var settings = target.data(self.attr_name(true) + '-init') || self.settings;
          
          if(S(e.target).data(self.data_attr()) && settings.is_hover) {
            self.closeall.call(self);
          }
          
          if (settings.is_hover) self.open.apply(self, [dropdown, target]);
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          self.timeout = setTimeout(function () {
            if ($this.data(self.data_attr())) {
              var settings = $this.data(self.data_attr(true) + '-init') || self.settings;
              if (settings.is_hover) self.close.call(self, S('#' + $this.data(self.data_attr())));
            } else {
              var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
              if (settings.is_hover) self.close.call(self, $this);
            }
          }.bind(this), 150);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');

          if (S(e.target).data(self.data_attr()) || S(e.target).parent().data(self.data_attr())) {
            return;
          }
          if (!(S(e.target).data('revealId')) && 
            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') || 
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

          self.close.call(self, S('[' + self.attr_name() + '-content]'));
        })
        .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.opened.call(this);
        })
        .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.closed.call(this);
        });

      S(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50));

      this.resize();
    },

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class);

          self.S(this).trigger('closed', [dropdown]);
        }
      });
    },

    closeall: function() {
      var self = this;
      $.each(self.S('[' + this.attr_name() + '-content]'), function() {
        self.close.call(self, self.S(this))
      });
    },

    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.active_class), target);
        dropdown.trigger('opened', [dropdown, target]);
    },

    data_attr: function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      var dropdown = this.S('#' + target.data(this.data_attr()));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
      } else {
        this.close.call(this, this.S('[' + this.attr_name() + '-content]'))
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[' + this.attr_name() + '-content].open'),
          target = this.S("[" + this.attr_name() + "='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      this.clear_idx();

      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: p.top
        });

        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%');
      } else {
        var settings = target.data(this.attr_name(true) + '-init') || this.settings;

        this.style(dropdown, target, settings);
      }

      return dropdown;
    },

    style : function (dropdown, target, settings) {
      var css = $.extend({position: 'absolute'}, 
        this.dirs[settings.align].call(dropdown, target, settings));

      dropdown.attr('style', '').css(css);
    },

    // return CSS property object
    // `this` is the dropdown
    dirs : {
      // Calculate target offset
      _base : function (t) {
        var o_p = this.offsetParent(),
            o = o_p.offset(),
            p = t.offset();

        p.top -= o.top;
        p.left -= o.left;

        return p;
      },
      top: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        this.addClass('drop-top');

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (Foundation.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), 
            top: p.top - this.outerHeight()};
        }

        return {left: p.left, top: p.top - this.outerHeight()};
      },
      bottom: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (self.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), top: p.top + t.outerHeight()};
        }

        return {left: p.left, top: p.top + t.outerHeight()};
      },
      left: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-left');

        return {left: p.left - this.outerWidth(), top: p.top};
      },
      right: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-right');

        return {left: p.left + t.outerWidth(), top: p.top};
      }
    },

    // Insert rule to style psuedo elements
    adjust_pip : function (pip_offset_base, p) {
      var sheet = Foundation.stylesheet;

      if (this.small()) {
        pip_offset_base += p.left - 8;
      }

      this.rule_idx = sheet.cssRules.length;

      var sel_before = '.f-dropdown.open:before',
          sel_after  = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (sheet.insertRule) {
        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },

    // Remove old dropdown rule index
    clear_idx : function () {
      var sheet = Foundation.stylesheet;

      if (this.rule_idx) {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off: function () {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.2.1',

    settings : {
      use_tallest: true,
      before_height_change: $.noop,
      after_height_change: $.noop
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        this.reflow();
      }.bind(this));
    },

    equalize: function(equalizer) {
      var isStacked = false,
          vals = equalizer.find('[' + this.attr_name() + '-watch]'),
          firstTopOffset = vals.first().offset().top,
          settings = equalizer.data(this.attr_name(true)+'-init');

      if (vals.length === 0) return;
      settings.before_height_change();
      equalizer.trigger('before-height-change');
      vals.height('inherit');
      vals.each(function(){
        var el = $(this);
        if (el.offset().top !== firstTopOffset) {
          isStacked = true;
        }
      });
      if (isStacked) return;

      var heights = vals.map(function(){ return $(this).outerHeight() }).get();
      if (settings.use_tallest) {
        var max = Math.max.apply(null, heights);
        vals.css('height', max);
      } else {
        var min = Math.min.apply(null, heights);
        vals.css('height', min);
      }
      settings.after_height_change();
      equalizer.trigger('after-height-change');
    },

    reflow : function () {
      var self = this;

      this.S('[' + this.attr_name() + ']', this.scope).each(function(){
        self.equalize($(this));
      });
    }
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '5.2.1',

    cache : {},

    images_loaded : false,
    nodes_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default' : 'only screen',
        small : Foundation.media_queries.small,
        medium : Foundation.media_queries.medium,
        large : Foundation.media_queries.large,
        xlarge : Foundation.media_queries.xlarge,
        xxlarge: Foundation.media_queries.xxlarge,
        landscape : 'only screen and (orientation: landscape)',
        portrait : 'only screen and (orientation: portrait)',
        retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
          'only screen and (min--moz-device-pixel-ratio: 2),' +
          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
          'only screen and (min-device-pixel-ratio: 2),' +
          'only screen and (min-resolution: 192dpi),' +
          'only screen and (min-resolution: 2dppx)'
      },

      directives : {
        replace: function (el, path, trigger) {
          // The trigger argument, if called within the directive, fires
          // an event named after the directive on the element, passing
          // any parameters along to the event that you pass to trigger.
          //
          // ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
          //
          // This allows you to bind a callback like so:
          // $('#interchangeContainer').on('replace', function (e, a, b, c) {
          //   console.log($(this).html(), a, b, c);
          // });

          if (/IMG/.test(el[0].nodeName)) {
            var orig_path = el[0].src;

            if (new RegExp(path, 'i').test(orig_path)) return;

            el[0].src = path;

            return trigger(el[0].src);
          }
          var last_path = el.data(this.data_attr + '-last-path');

          if (last_path == path) return;


          var regex = "/^.(\.jpg|\.jpeg|\.png|\.gif|\.tiff|\.bmp)\??|#?./";

          if (new RegExp(regex,'i').test(path)){

              $(el).css('background-image', 'url('+path+')');
              el.data('interchange-last-path', path);
              return trigger(path);
          }

          return $.get(path, function (response) {
            el.html(response);
            el.data(this.data_attr + '-last-path', path);
            trigger();
          });

        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.data_attr = this.set_data_attr();
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
      this.load('images');
      this.load('nodes');
    },

    get_media_hash : function() {
        var mediaHash='';
        for (var queryName in this.settings.named_queries ) {
            mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
        }
        return mediaHash;
    },

    events : function () {
      var self = this, prevMediaHash;

      $(window)
        .off('.interchange')
        .on('resize.fndtn.interchange', self.throttle(function () {
            var currMediaHash = self.get_media_hash();
            if (currMediaHash !== prevMediaHash) {
                self.resize();
            }
            prevMediaHash = currMediaHash;
        }, 50));

      return this;
    },

    resize : function () {
      var cache = this.cache;

      if(!this.images_loaded || !this.nodes_loaded) {
        setTimeout($.proxy(this.resize, this), 50);
        return;
      }

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);

          if (passed) {
            this.settings.directives[passed
              .scenario[1]].call(this, passed.el, passed.scenario[0], function () {
                if (arguments[0] instanceof Array) { 
                  var args = arguments[0];
                } else { 
                  var args = Array.prototype.slice.call(arguments, 0);
                }

                passed.el.trigger(passed.scenario[1], args);
              });
          }
        }
      }

    },

    results : function (uuid, scenarios) {
      var count = scenarios.length;

      if (count > 0) {
        var el = this.S('[' + this.add_namespace('data-uuid') + '="' + uuid + '"]');

        while (count--) {
          var mq, rule = scenarios[count][2];
          if (this.settings.named_queries.hasOwnProperty(rule)) {
            mq = matchMedia(this.settings.named_queries[rule]);
          } else {
            mq = matchMedia(rule);
          }
          if (mq.matches) {
            return {el: el, scenario: scenarios[count]};
          }
        }
      }

      return false;
    },

    load : function (type, force_update) {
      if (typeof this['cached_' + type] === 'undefined' || force_update) {
        this['update_' + type]();
      }

      return this['cached_' + type];
    },

    update_images : function () {
      var images = this.S('img[' + this.data_attr + ']'),
          count = images.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cache = {};
      this.cached_images = [];
      this.images_loaded = (count === 0);

      while (i--) {
        loaded_count++;
        if (images[i]) {
          var str = images[i].getAttribute(data_attr) || '';

          if (str.length > 0) {
            this.cached_images.push(images[i]);
          }
        }

        if (loaded_count === count) {
          this.images_loaded = true;
          this.enhance('images');
        }
      }

      return this;
    },

    update_nodes : function () {
      var nodes = this.S('[' + this.data_attr + ']').not('img'),
          count = nodes.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cached_nodes = [];
      this.nodes_loaded = (count === 0);


      while (i--) {
        loaded_count++;
        var str = nodes[i].getAttribute(data_attr) || '';

        if (str.length > 0) {
          this.cached_nodes.push(nodes[i]);
        }

        if(loaded_count === count) {
          this.nodes_loaded = true;
          this.enhance('nodes');
        }
      }

      return this;
    },

    enhance : function (type) {
      var i = this['cached_' + type].length;

      while (i--) {
        this.object($(this['cached_' + type][i]));
      }

      return $(window).trigger('resize');
    },

    parse_params : function (path, directive, mq) {
      return [this.trim(path), this.convert_directive(directive), this.trim(mq)];
    },

    convert_directive : function (directive) {

      var trimmed = this.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    object : function(el) {
      var raw_arr = this.parse_data_attr(el),
          scenarios = [], 
          i = raw_arr.length;

      if (i > 0) {
        while (i--) {
          var split = raw_arr[i].split(/\((.*?)(\))$/);

          if (split.length > 1) {
            var cached_split = split[0].split(','),
                params = this.parse_params(cached_split[0],
                  cached_split[1], split[1]);

            scenarios.push(params);
          }
        }
      }

      return this.store(el, scenarios);
    },

    store : function (el, scenarios) {
      var uuid = this.random_str(),
          current_uuid = el.data(this.add_namespace('uuid', true));

      if (this.cache[current_uuid]) return this.cache[current_uuid];

      el.attr(this.add_namespace('data-uuid'), uuid);

      return this.cache[uuid] = scenarios;
    },

    trim : function(str) {

      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    set_data_attr: function (init) {
      if (init) {
        if (this.namespace.length > 0) {
          return this.namespace + '-' + this.settings.load_attr;
        }

        return this.settings.load_attr;
      }

      if (this.namespace.length > 0) {
        return 'data-' + this.namespace + '-' + this.settings.load_attr;
      }

      return 'data-' + this.settings.load_attr;
    },

    parse_data_attr : function (el) {
      var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/),
          i = raw.length, 
          output = [];

      while (i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    },

    reflow : function () {
      this.load('images', true);
      this.load('nodes', true);
    }

  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  var Modernizr = Modernizr || false;

  Foundation.libs.joyride = {
    name : 'joyride',

    version : '5.2.1',

    defaults : {
      expose                   : false,     // turn on or off the expose feature
      modal                    : true,      // Whether to cover page with modal during the tour
      tip_location             : 'bottom',  // 'top' or 'bottom' in relation to parent
      nub_position             : 'auto',    // override on a per tooltip bases
      scroll_speed             : 1500,      // Page scrolling speed in milliseconds, 0 = no scroll animation
      scroll_animation         : 'linear',  // supports 'swing' and 'linear', extend with jQuery UI.
      timer                    : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      start_timer_on_click     : true,      // true or false - true requires clicking the first button start the timer
      start_offset             : 0,         // the index of the tooltip you want to start on (index of the li)
      next_button              : true,      // true or false to control whether a next button is used
      tip_animation            : 'fade',    // 'pop' or 'fade' in each tip
      pause_after              : [],        // array of indexes where to pause the tour after
      exposed                  : [],        // array of expose elements
      tip_animation_fade_speed : 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookie_monster           : false,     // true or false to control whether cookies are used
      cookie_name              : 'joyride', // Name the cookie you'll use
      cookie_domain            : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookie_expires           : 365,       // set when you would like the cookie to expire.
      tip_container            : 'body',    // Where will the tip be attached
      tip_location_patterns    : {
        top: ['bottom'],
        bottom: [], // bottom should not need to be repositioned
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom']
      },
      post_ride_callback     : function (){},    // A method to call once the tour closes (canceled or complete)
      post_step_callback     : function (){},    // A method to call after each step
      pre_step_callback      : function (){},    // A method to call before each step
      pre_ride_callback      : function (){},    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      post_expose_callback   : function (){},    // A method to call after an element has been exposed
      template : { // HTML segments for tip layout
        link    : '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper : '<div class="joyride-content-wrapper"></div>',
        button  : '<a href="#" class="small button joyride-next-tip"></a>',
        modal   : '<div class="joyride-modal-bg"></div>',
        expose  : '<div class="joyride-expose-wrapper"></div>',
        expose_cover: '<div class="joyride-expose-cover"></div>'
      },
      expose_add_class : '' // One or more space-separated class names to be added to exposed element
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.settings = this.settings || $.extend({}, this.defaults, (options || method));

      this.bindings(method, options)
    },

    events : function () {
      var self = this;

      $(this.scope)
        .off('.joyride')
        .on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
          e.preventDefault();

          if (this.settings.$li.next().length < 1) {
            this.end();
          } else if (this.settings.timer > 0) {
            clearTimeout(this.settings.automate);
            this.hide();
            this.show();
            this.startTimer();
          } else {
            this.hide();
            this.show();
          }

        }.bind(this))

        .on('click.fndtn.joyride', '.joyride-close-tip', function (e) {
          e.preventDefault();
          this.end();
        }.bind(this));

      $(window)
        .off('.joyride')
        .on('resize.fndtn.joyride', self.throttle(function () {
          if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip) {
            if (self.settings.exposed.length > 0) {
              var $els = $(self.settings.exposed);

              $els.each(function () {
                var $this = $(this);
                self.un_expose($this);
                self.expose($this);
              });
            }

            if (self.is_phone()) {
              self.pos_phone();
            } else {
              self.pos_default(false, true);
            }
          }
        }, 100));
    },

    start : function () {
      var self = this,
          $this = $('[' + this.attr_name() + ']', this.scope),
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!$this.length > 0) return;

      if (!this.settings.init) this.events();

      this.settings = $this.data(this.attr_name(true) + '-init');

      // non configureable settings
      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tip_container);
      this.settings.body_offset = $(this.settings.tip_container).position();
      this.settings.$tip_content = this.settings.$content_el.find('> li');
      this.settings.paused = false;
      this.settings.attempts = 0;

      // can we create cookies?
      if (typeof $.cookie !== 'function') {
        this.settings.cookie_monster = false;
      }

      // generate the tips and insert into dom.
      if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
        this.settings.$tip_content.each(function (index) {
          var $this = $(this);
          this.settings = $.extend({}, self.defaults, self.data_options($this))

          // Make sure that settings parsed from data_options are integers where necessary
          var i = int_settings_count;
          while (i--) {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
          }
          self.create({$li : $this, index : index});
        });

        // show first tip
        if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
          this.show('init');
          this.startTimer();
        } else {
          this.show('init');
        }

      }
    },

    resume : function () {
      this.set_li();
      this.show();
    },

    tip_template : function (opts) {
      var $blank, content;

      opts.tip_class = opts.tip_class || '';

      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
      content = $.trim($(opts.li).html()) +
        this.button_text(opts.button_text) +
        this.settings.template.link +
        this.timer_instance(opts.index);

      $blank.append($(this.settings.template.wrapper));
      $blank.first().attr(this.add_namespace('data-index'), opts.index);
      $('.joyride-content-wrapper', $blank).append(content);

      return $blank[0];
    },

    timer_instance : function (index) {
      var txt;

      if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) {
        txt = '';
      } else {
        txt = $(this.settings.template.timer)[0].outerHTML;
      }
      return txt;
    },

    button_text : function (txt) {
      if (this.settings.next_button) {
        txt = $.trim(txt) || 'Next';
        txt = $(this.settings.template.button).append(txt)[0].outerHTML;
      } else {
        txt = '';
      }
      return txt;
    },

    create : function (opts) {
      var buttonText = opts.$li.attr(this.add_namespace('data-button')) 
        || opts.$li.attr(this.add_namespace('data-text')),
        tipClass = opts.$li.attr('class'),
        $tip_content = $(this.tip_template({
          tip_class : tipClass,
          index : opts.index,
          button_text : buttonText,
          li : opts.$li
        }));

      $(this.settings.tip_container).append($tip_content);
    },

    show : function (init) {
      var $timer = null;

      // are we paused?
      if (this.settings.$li === undefined
        || ($.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {

        // don't go to the next li if the tour was paused
        if (this.settings.paused) {
          this.settings.paused = false;
        } else {
          this.set_li(init);
        }

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0) {
          if (init) { //run when we first start
            this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
            if (this.settings.modal) {
              this.show_modal();
            }
          }

          this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);

          if (this.settings.modal && this.settings.expose) {
            this.expose();
          }

          this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));

          this.settings.timer = parseInt(this.settings.timer, 10);

          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];

          // scroll if not modal
          if (!/body/i.test(this.settings.$target.selector)) {
            this.scroll_to();
          }

          if (this.is_phone()) {
            this.pos_phone(true);
          } else {
            this.pos_default(true);
          }

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

          if (/pop/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip.show();

              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);

            } else {
              this.settings.$next_tip.show();

            }


          } else if (/fade/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip
                .fadeIn(this.settings.tip_animation_fade_speed)
                .show();

              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fadeSpeed);

            } else {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
            }
          }

          this.settings.$current_tip = this.settings.$next_tip;

        // skip non-existant targets
        } else if (this.settings.$li && this.settings.$target.length < 1) {

          this.show();

        } else {

          this.end();

        }
      } else {

        this.settings.paused = true;

      }

    },

    is_phone : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    hide : function () {
      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      if (!this.settings.modal) {
        $('.joyride-modal-bg').hide();
      }

      // Prevent scroll bouncing...wait to remove from layout
      this.settings.$current_tip.css('visibility', 'hidden');
      setTimeout($.proxy(function() {
        this.hide();
        this.css('visibility', 'visible');
      }, this.settings.$current_tip), 0);
      this.settings.post_step_callback(this.settings.$li.index(),
        this.settings.$current_tip);
    },

    set_li : function (init) {
      if (init) {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
        this.set_next_tip();
        this.settings.$current_tip = this.settings.$next_tip;
      } else {
        this.settings.$li = this.settings.$li.next();
        this.set_next_tip();
      }

      this.set_target();
    },

    set_next_tip : function () {
      this.settings.$next_tip = $(".joyride-tip-guide").eq(this.settings.$li.index());
      this.settings.$next_tip.data('closed', '');
    },

    set_target : function () {
      var cl = this.settings.$li.attr(this.add_namespace('data-class')),
          id = this.settings.$li.attr(this.add_namespace('data-id')),
          $sel = function () {
            if (id) {
              return $(document.getElementById(id));
            } else if (cl) {
              return $('.' + cl).first();
            } else {
              return $('body');
            }
          };

      this.settings.$target = $sel();
    },

    scroll_to : function () {
      var window_half, tipOffset;

      window_half = $(window).height() / 2;
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());

      if (tipOffset != 0) {
        $('html, body').animate({
          scrollTop: tipOffset
        }, this.settings.scroll_speed, 'swing');
      }
    },

    paused : function () {
      return ($.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1);
    },

    restart : function () {
      this.hide();
      this.settings.$li = undefined;
      this.show('init');
    },

    pos_default : function (init, resizing) {
      var half_fold = Math.ceil($(window).height() / 2),
          tip_position = this.settings.$next_tip.offset(),
          $nub = this.settings.$next_tip.find('.joyride-nub'),
          nub_width = Math.ceil($nub.outerWidth() / 2),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      // tip must not be "display: none" to calculate position
      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (typeof resizing === 'undefined') {
        resizing = false;
      }

      if (!/body/i.test(this.settings.$target.selector)) {
          if (this.bottom()) {
            if (this.rtl) {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight()),
                left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
            } else {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight()),
                left: this.settings.$target.offset().left});
            }

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'top');

          } else if (this.top()) {
            if (this.rtl) {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height),
                left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
            } else {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height),
                left: this.settings.$target.offset().left});
            }

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom');

          } else if (this.right()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width)});

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'left');

          } else if (this.left()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width)});

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'right');

          }

          if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {

            $nub.removeClass('bottom')
              .removeClass('top')
              .removeClass('right')
              .removeClass('left');

            this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];

            this.settings.attempts++;

            this.pos_default();

          }

      } else if (this.settings.$li.length) {

        this.pos_modal($nub);

      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }

    },

    pos_phone : function (init) {
      var tip_height = this.settings.$next_tip.outerHeight(),
          tip_offset = this.settings.$next_tip.offset(),
          target_height = this.settings.$target.outerHeight(),
          $nub = $('.joyride-nub', this.settings.$next_tip),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      $nub.removeClass('bottom')
        .removeClass('top')
        .removeClass('right')
        .removeClass('left');

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {

        if (this.top()) {

            this.settings.$next_tip.offset({top: this.settings.$target.offset().top - tip_height - nub_height});
            $nub.addClass('bottom');

        } else {

          this.settings.$next_tip.offset({top: this.settings.$target.offset().top + target_height + nub_height});
          $nub.addClass('top');

        }

      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },

    pos_modal : function ($nub) {
      this.center();
      $nub.hide();

      this.show_modal();
    },

    show_modal : function () {
      if (!this.settings.$next_tip.data('closed')) {
        var joyridemodalbg =  $('.joyride-modal-bg');
        if (joyridemodalbg.length < 1) {
          $('body').append(this.settings.template.modal).show();
        }

        if (/pop/i.test(this.settings.tip_animation)) {
            joyridemodalbg.show();
        } else {
            joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
        }
      }
    },

    expose : function () {
      var expose,
          exposeCover,
          el,
          origCSS,
          origClasses,
          randId = 'expose-' + this.random_str(6);

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if(window.console){
          console.error('element not valid', el);
        }
        return false;
      }

      expose = $(this.settings.template.expose);
      this.settings.$body.append(expose);
      expose.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });

      exposeCover = $(this.settings.template.expose_cover);

      origCSS = {
        zIndex: el.css('z-index'),
        position: el.css('position')
      };

      origClasses = el.attr('class') == null ? '' : el.attr('class');

      el.css('z-index',parseInt(expose.css('z-index'))+1);

      if (origCSS.position == 'static') {
        el.css('position','relative');
      }

      el.data('expose-css',origCSS);
      el.data('orig-class', origClasses);
      el.attr('class', origClasses + ' ' + this.settings.expose_add_class);

      exposeCover.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });

      if (this.settings.modal) this.show_modal();

      this.settings.$body.append(exposeCover);
      expose.addClass(randId);
      exposeCover.addClass(randId);
      el.data('expose', randId);
      this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
      this.add_exposed(el);
    },

    un_expose : function () {
      var exposeId,
          el,
          expose ,
          origCSS,
          origClasses,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if (window.console) {
          console.error('element not valid', el);
        }
        return false;
      }

      exposeId = el.data('expose');
      expose = $('.' + exposeId);

      if (arguments.length > 1) {
        clearAll = arguments[1];
      }

      if (clearAll === true) {
        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
      } else {
        expose.remove();
      }

      origCSS = el.data('expose-css');

      if (origCSS.zIndex == 'auto') {
        el.css('z-index', '');
      } else {
        el.css('z-index', origCSS.zIndex);
      }

      if (origCSS.position != el.css('position')) {
        if(origCSS.position == 'static') {// this is default, no need to set it.
          el.css('position', '');
        } else {
          el.css('position', origCSS.position);
        }
      }

      origClasses = el.data('orig-class');
      el.attr('class', origClasses);
      el.removeData('orig-classes');

      el.removeData('expose');
      el.removeData('expose-z-index');
      this.remove_exposed(el);
    },

    add_exposed: function(el){
      this.settings.exposed = this.settings.exposed || [];
      if (el instanceof $ || typeof el === 'object') {
        this.settings.exposed.push(el[0]);
      } else if (typeof el == 'string') {
        this.settings.exposed.push(el);
      }
    },

    remove_exposed: function(el){
      var search, i;
      if (el instanceof $) {
        search = el[0]
      } else if (typeof el == 'string'){
        search = el;
      }

      this.settings.exposed = this.settings.exposed || [];
      i = this.settings.exposed.length;

      while (i--) {
        if (this.settings.exposed[i] == search) {
          this.settings.exposed.splice(i, 1);
          return;
        }
      }
    },

    center : function () {
      var $w = $(window);

      this.settings.$next_tip.css({
        top : ((($w.height() - this.settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
        left : ((($w.width() - this.settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
      });

      return true;
    },

    bottom : function () {
      return /bottom/i.test(this.settings.tip_settings.tip_location);
    },

    top : function () {
      return /top/i.test(this.settings.tip_settings.tip_location);
    },

    right : function () {
      return /right/i.test(this.settings.tip_settings.tip_location);
    },

    left : function () {
      return /left/i.test(this.settings.tip_settings.tip_location);
    },

    corners : function (el) {
      var w = $(window),
          window_half = w.height() / 2,
          //using this to calculate since scroll may not have finished yet.
          tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
          right = w.width() + w.scrollLeft(),
          offsetBottom =  w.height() + tipOffset,
          bottom = w.height() + w.scrollTop(),
          top = w.scrollTop();

      if (tipOffset < top) {
        if (tipOffset < 0) {
          top = 0;
        } else {
          top = tipOffset;
        }
      }

      if (offsetBottom > bottom) {
        bottom = offsetBottom;
      }

      return [
        el.offset().top < top,
        right < el.offset().left + el.outerWidth(),
        bottom < el.offset().top + el.outerHeight(),
        w.scrollLeft() > el.offset().left
      ];
    },

    visible : function (hidden_corners) {
      var i = hidden_corners.length;

      while (i--) {
        if (hidden_corners[i]) return false;
      }

      return true;
    },

    nub_position : function (nub, pos, def) {
      if (pos === 'auto') {
        nub.addClass(def);
      } else {
        nub.addClass(pos);
      }
    },

    startTimer : function () {
      if (this.settings.$li.length) {
        this.settings.automate = setTimeout(function () {
          this.hide();
          this.show();
          this.startTimer();
        }.bind(this), this.settings.timer);
      } else {
        clearTimeout(this.settings.automate);
      }
    },

    end : function () {
      if (this.settings.cookie_monster) {
        $.cookie(this.settings.cookie_name, 'ridden', { expires: this.settings.cookie_expires, domain: this.settings.cookie_domain });
      }

      if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
      }

      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      this.settings.$next_tip.data('closed', true);

      $('.joyride-modal-bg').hide();
      this.settings.$current_tip.hide();
      this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
      this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
      $('.joyride-tip-guide').remove();
    },

    off : function () {
      $(this.scope).off('.joyride');
      $(window).off('.joyride');
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
      $('.joyride-tip-guide, .joyride-modal-bg').remove();
      clearTimeout(this.settings.automate);
      this.settings = {};
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var i = class_array.length;
    var head = $('head');

    while (i--) {
      if($('head').has('.' + class_array[i]).length === 0) {
        $('head').append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-medium',
    'foundation-mq-large',
    'foundation-mq-xlarge',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function() {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) return context;
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) arr.push('data');
    if (this.namespace.length > 0) arr.push(this.namespace);
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        should_bind_events = !S(this).data(this.attr_name(true));

    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

      if (should_bind_events) {
        this.events(this.scope);
      }

    } else {
      S('[' + this.attr_name() +']', this.scope).each(function () {
        var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
        S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

        if (should_bind_events) {
          self.events(this);
        }
      });
    }
  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };
  
  /*
    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc, undefined ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function (q) {

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function($) {

  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + "CancelAnimationFrame" ] || 
      window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);
      
      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    
    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( jQuery ));


  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.2.1',

    media_queries : {
      small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global: {
      namespace: ''
    },

    init : function (scope, libraries, method, options, response) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
                $.extend(true, this.libs[lib].settings, args[lib]);
            }
            else if (typeof this.libs[lib].defaults !== 'undefined') {
                $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : Array(args);    // PATCH: added this line
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace: function () {

      // Don't bother reading the namespace out of the meta tag
      // if the namespace has been set globally in javascript
      //
      // Example: something like Foundation.global.namespace = 'my-namespace';
      //
      // Otherwise, if the namespace hasn't been set globally,
      // read it out of the meta tag
      //
      var namespace = this.global.namespace || $('.foundation-data-attribute-namespace').css('font-family');

      if (/false/i.test(namespace)) return;
      
      this.global.namespace = namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById 
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be 
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default 
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the 
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds 
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          clearTimeout(timer);
          timer = setTimeout(function () {
            func.apply(context, args);
          }, delay);
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      // 
      //    Immediate (Bool): Whether the function should be called at the beginning 
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) result = func.apply(context, args);
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options 
      //    attribute.
      data_options : function (el) {
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-options');
              }

              return el.data('options');
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';'),
        ii = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1], 10);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in 
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if(Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '">');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be 
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' + 
              Foundation.media_queries[media] + '{ ' + rule + ' }');
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Fundation to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        if (unloaded === 0) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random 
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) this.fidx = 0;
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs['magellan-expedition'] = {
    name : 'magellan-expedition',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      threshold: 0, // pixels from the top of the expedition for it to become fixes
      destination_threshold: 20, // pixels from the top of destination for it to be considered active
      throttle_delay: 30 // calculation throttling to increase framerate
    }, 

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          settings = self.settings;
      
      // initialize expedition offset
      self.set_expedition_position();
      
      S(self.scope)
        .off('.magellan')
        .on('click.fndtn.magellan', '[' + self.add_namespace('data-magellan-arrival') + '] a[href^="#"]', function (e) {
            e.preventDefault();
            var expedition = $(this).closest('[' + self.attr_name() + ']'),
                settings = expedition.data('magellan-expedition-init');

            var hash = this.hash.split('#').join(''),
                target = $('a[name='+hash+']');
            if (target.length === 0) target = $('#'+hash);

            // Account for expedition height if fixed position
            var scroll_top = target.offset().top;
            if (expedition.css('position') === 'fixed') {
              scroll_top = scroll_top - expedition.outerHeight();
            }

            $('html, body').stop().animate({
                'scrollTop': scroll_top
            }, 700, 'swing', function () {
                window.location.hash = '#'+hash;
            });
        })
        .on('scroll.fndtn.magellan', self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay))
        $(window).on('resize.fndtn.magellan', self.throttle(this.set_expedition_position.bind(this), settings.throttle_delay));
    },

    check_for_arrivals : function() {
      var self = this;
      self.update_arrivals();
      self.update_expedition_positions();
    },

    set_expedition_position : function() {
      var self = this;
      $('[' + this.attr_name() + '=fixed]', self.scope).each(function(idx, el) {
        var expedition = $(this),
            styles = expedition.attr('styles'), // save styles
            top_offset;

        expedition.attr('style', '');
        top_offset = expedition.offset().top;

        expedition.data(self.data_attr('magellan-top-offset'), top_offset);
        expedition.attr('style', styles);
      });
    },

    update_expedition_positions : function() {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + '=fixed]', self.scope).each(function() {
        var expedition = $(this),
            top_offset = expedition.data('magellan-top-offset');
        
        if (window_top_offset >= top_offset) {
          // Placeholder allows height calculations to be consistent even when
          // appearing to switch between fixed/non-fixed placement
          var placeholder = expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']');
          if (placeholder.length === 0) {
            placeholder = expedition.clone();
            placeholder.removeAttr(self.attr_name());
            placeholder.attr(self.add_namespace('data-magellan-expedition-clone'),'');
            expedition.before(placeholder);
          }
          expedition.css({position:'fixed', top: 0});
        } else {
          expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']').remove();
          expedition.attr('style','');
        }
      });
    },

    update_arrivals : function() {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + ']', self.scope).each(function() {
        var expedition = $(this),
            settings = settings = expedition.data(self.attr_name(true) + '-init'),
            offsets = self.offsets(expedition, window_top_offset),
            arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']'),
            active_item = false;
        offsets.each(function(idx, item) {
          if (item.viewport_offset >= item.top_offset) {
            var arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']');
            arrivals.not(item.arrival).removeClass(settings.active_class);
            item.arrival.addClass(settings.active_class);
            active_item = true;
            return true;
          }
        });

        if (!active_item) arrivals.removeClass(settings.active_class);
      });
    },

    offsets : function(expedition, window_offset) {
      var self = this,
          settings = expedition.data(self.attr_name(true) + '-init'),
          viewport_offset = (window_offset + settings.destination_threshold);

      return expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']').map(function(idx, el) {
        var name = $(this).data(self.data_attr('magellan-arrival')),
            dest = $('[' + self.add_namespace('data-magellan-destination') + '=' + name + ']');
        if (dest.length > 0) {
          var top_offset = dest.offset().top;
          return {
            destination : dest,
            arrival : $(this),
            top_offset : top_offset,
            viewport_offset : viewport_offset
          }
        }
      }).sort(function(a, b) {
        if (a.top_offset < b.top_offset) return -1;
        if (a.top_offset > b.top_offset) return 1;
        return 0;
      });
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {
      this.S(this.scope).off('.magellan');
      this.S(window).off('.magellan');
    },

    reflow : function () {
      var self = this;
      // remove placeholder expeditions used for height calculation purposes
      $('[' + self.add_namespace('data-magellan-expedition-clone') + ']', self.scope).remove();
    }
  };
}(jQuery, this, this.document));
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,n,r){"use strict";function l(e){if(typeof e=="string"||e instanceof String)e=e.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"");return e}var i=function(t){var n=t.length,r=e("head");while(n--)e("head").has("."+t[n]).length===0&&e("head").append('<meta class="'+t[n]+'" />')};i(["foundation-mq-small","foundation-mq-medium","foundation-mq-large","foundation-mq-xlarge","foundation-mq-xxlarge","foundation-data-attribute-namespace"]),e(function(){typeof FastClick!="undefined"&&typeof n.body!="undefined"&&FastClick.attach(n.body)});var s=function(t,r){if(typeof t=="string"){if(r){var i;if(r.jquery){i=r[0];if(!i)return r}else i=r;return e(i.querySelectorAll(t))}return e(n.querySelectorAll(t))}return e(t,r)},o=function(e){var t=[];return e||t.push("data"),this.namespace.length>0&&t.push(this.namespace),t.push(this.name),t.join("-")},u=function(e){var t=e.split("-"),n=t.length,r=[];while(n--)n!==0?r.push(t[n]):this.namespace.length>0?r.push(this.namespace,t[n]):r.push(t[n]);return r.reverse().join("-")},a=function(t,n){var r=this,i=!s(this).data(this.attr_name(!0));if(typeof t=="string")return this[t].call(this,n);s(this.scope).is("["+this.attr_name()+"]")?(s(this.scope).data(this.attr_name(!0)+"-init",e.extend({},this.settings,n||t,this.data_options(s(this.scope)))),i&&this.events(this.scope)):s("["+this.attr_name()+"]",this.scope).each(function(){var i=!s(this).data(r.attr_name(!0)+"-init");s(this).data(r.attr_name(!0)+"-init",e.extend({},r.settings,n||t,r.data_options(s(this)))),i&&r.events(this)})},f=function(e,t){function n(){t(e[0])}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)};t.matchMedia=t.matchMedia||function(e,t){var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",s.style.background="none",s.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',r.insertBefore(s,i),n=o.offsetWidth===42,r.removeChild(s),{matches:n,media:e}}}(n),function(e){function a(){n&&(s(a),u&&jQuery.fx.tick())}var n,r=0,i=["webkit","moz"],s=t.requestAnimationFrame,o=t.cancelAnimationFrame,u="undefined"!=typeof jQuery.fx;for(;r<i.length&&!s;r++)s=t[i[r]+"RequestAnimationFrame"],o=o||t[i[r]+"CancelAnimationFrame"]||t[i[r]+"CancelRequestAnimationFrame"];s?(t.requestAnimationFrame=s,t.cancelAnimationFrame=o,u&&(jQuery.fx.timer=function(e){e()&&jQuery.timers.push(e)&&!n&&(n=!0,a())},jQuery.fx.stop=function(){n=!1})):(t.requestAnimationFrame=function(e,n){var i=(new Date).getTime(),s=Math.max(0,16-(i-r)),o=t.setTimeout(function(){e(i+s)},s);return r=i+s,o},t.cancelAnimationFrame=function(e){clearTimeout(e)})}(jQuery),t.Foundation={name:"Foundation",version:"5.2.1",media_queries:{small:s(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:s(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:s(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:s(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:s(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:e("<style></style>").appendTo("head")[0].sheet,global:{namespace:""},init:function(e,t,n,r,i){var o,u=[e,n,r,i],a=[];this.rtl=/rtl/i.test(s("html").attr("dir")),this.scope=e||this.scope,this.set_namespace();if(t&&typeof t=="string"&&!/reflow/i.test(t))this.libs.hasOwnProperty(t)&&a.push(this.init_lib(t,u));else for(var f in this.libs)a.push(this.init_lib(f,t));return e},init_lib:function(t,n){return this.libs.hasOwnProperty(t)?(this.patch(this.libs[t]),n&&n.hasOwnProperty(t)?(typeof this.libs[t].settings!="undefined"?e.extend(!0,this.libs[t].settings,n[t]):typeof this.libs[t].defaults!="undefined"&&e.extend(!0,this.libs[t].defaults,n[t]),this.libs[t].init.apply(this.libs[t],[this.scope,n[t]])):(n=n instanceof Array?n:Array(n),this.libs[t].init.apply(this.libs[t],n))):function(){}},patch:function(e){e.scope=this.scope,e.namespace=this.global.namespace,e.rtl=this.rtl,e.data_options=this.utils.data_options,e.attr_name=o,e.add_namespace=u,e.bindings=a,e.S=this.utils.S},inherit:function(e,t){var n=t.split(" "),r=n.length;while(r--)this.utils.hasOwnProperty(n[r])&&(e[n[r]]=this.utils[n[r]])},set_namespace:function(){var t=this.global.namespace||e(".foundation-data-attribute-namespace").css("font-family");if(/false/i.test(t))return;this.global.namespace=t},libs:{},utils:{S:s,throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},debounce:function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},data_options:function(t){function a(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==!1&&e!==!0}function f(t){return typeof t=="string"?e.trim(t):t}var n={},r,i,s,o=function(e){var t=Foundation.global.namespace;return t.length>0?e.data(t+"-options"):e.data("options")},u=o(t);if(typeof u=="object")return u;s=(u||":").split(";"),r=s.length;while(r--)i=s[r].split(":"),/true/i.test(i[1])&&(i[1]=!0),/false/i.test(i[1])&&(i[1]=!1),a(i[1])&&(i[1].indexOf(".")===-1?i[1]=parseInt(i[1],10):i[1]=parseFloat(i[1],10)),i.length===2&&i[0].length>0&&(n[f(i[0])]=f(i[1]));return n},register_media:function(t,n){Foundation.media_queries[t]===r&&(e("head").append('<meta class="'+n+'">'),Foundation.media_queries[t]=l(e("."+n).css("font-family")))},add_custom_rule:function(e,t){if(t===r)Foundation.stylesheet.insertRule(e,Foundation.stylesheet.cssRules.length);else{var n=Foundation.media_queries[t];n!==r&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[t]+"{ "+e+" }")}},image_loaded:function(e,t){var n=this,r=e.length;r===0&&t(e),e.each(function(){f(n.S(this),function(){r-=1,r===0&&t(e)})})},random_str:function(){return this.fidx||(this.fidx=0),this.prefix=this.prefix||[this.name||"F",(+(new Date)).toString(36)].join("-"),this.prefix+(this.fidx++).toString(36)}}},e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(e)),this})}})(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.slider={name:"slider",version:"5.2.1",settings:{start:0,end:100,step:1,initial:null,display_selector:"",on_change:function(){}},cache:{},init:function(e,t,n){Foundation.inherit(this,"throttle"),this.bindings(t,n),this.reflow()},events:function(){var n=this;e(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider","["+n.attr_name()+"] .range-slider-handle",function(t){n.cache.active||n.set_active_slider(e(t.target))}).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider",function(e){!n.cache.active||(e.preventDefault(),n.calculate_position(n.cache.active,e.pageX||e.originalEvent.touches[0].clientX||e.currentPoint.x))}).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider",function(e){n.remove_active_slider()}).on("change.fndtn.slider",function(e){n.settings.on_change}),n.S(t).on("resize.fndtn.slider",n.throttle(function(e){n.reflow()},300))},set_active_slider:function(e){this.cache.active=e},remove_active_slider:function(){this.cache.active=null},calculate_position:function(t,n){var r=this,i=e.extend({},r.settings,r.data_options(t.parent())),s=e.data(t[0],"handle_w"),o=e.data(t[0],"handle_o"),u=e.data(t[0],"bar_w"),a=e.data(t[0],"bar_o");requestAnimationFrame(function(){var e=r.limit_to((n-a)/u,0,1),s=r.normalized_value(e,i.start,i.end,i.step);r.set_ui(t,s)})},set_ui:function(t,n){var r=e.extend({},this.settings,this.data_options(t.parent())),i=e.data(t[0],"handle_w"),s=e.data(t[0],"bar_w"),o=this.normalized_percentage(n,r.start,r.end),u=o*(s-i)-1,a=o*100;this.set_translate(t,u),t.siblings(".range-slider-active-segment").css("width",a+"%"),t.parent().attr(this.attr_name(),n),t.parent().trigger("change"),t.parent().children("input[type=hidden]").val(n),r.input_id!=""&&e(r.display_selector).each(function(){this.hasOwnProperty("value")?e(this).val(n):e(this).text(n)})},normalized_percentage:function(e,t,n){return e/(n-t)},normalized_value:function(e,t,n,r){var i=n-t,r=r,s=e*i,o=(s-s%r)/r,u=s%r,a=u>=r*.5?r:0;return o*r+a},set_translate:function(t,n,r){r?e(t).css("-webkit-transform","translateY("+n+"px)").css("-moz-transform","translateY("+n+"px)").css("-ms-transform","translateY("+n+"px)").css("-o-transform","translateY("+n+"px)").css("transform","translateY("+n+"px)"):e(t).css("-webkit-transform","translateX("+n+"px)").css("-moz-transform","translateX("+n+"px)").css("-ms-transform","translateX("+n+"px)").css("-o-transform","translateX("+n+"px)").css("transform","translateX("+n+"px)")},limit_to:function(e,t,n){return Math.min(Math.max(e,t),n)},initialize_settings:function(t){e.data(t,"bar",e(t).parent()),e.data(t,"bar_o",e(t).parent().offset().left),e.data(t,"bar_w",e(t).parent().outerWidth()),e.data(t,"handle_o",e(t).offset().left),e.data(t,"handle_w",e(t).outerWidth()),e.data(t,"settings",e.extend({},this.settings,this.data_options(e(t).parent())))},set_initial_position:function(t){var n=e.data(t.children(".range-slider-handle")[0],"settings"),r=n.initial?n.initial:Math.floor((n.end-n.start)*.5/n.step)*n.step,i=t.children(".range-slider-handle");this.set_ui(i,r)},set_value:function(t){var n=this;e("["+n.attr_name()+"]",this.scope).each(function(){e(this).attr(n.attr_name(),t)}),!e(this.scope).attr(n.attr_name())||e(this.scope).attr(n.attr_name(),t),n.reflow()},reflow:function(){var t=this;t.S("["+this.attr_name()+"]").each(function(){var n=e(this).children(".range-slider-handle")[0],r=e(this).attr(t.attr_name());t.initialize_settings(n),r?t.set_ui(e(n),parseInt(r)):t.set_initial_position(e(this))})}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";var i=i||!1;Foundation.libs.joyride={name:"joyride",version:"5.2.1",defaults:{expose:!1,modal:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(t,n,r){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||e.extend({},this.defaults,r||n),this.bindings(n,r)},events:function(){var n=this;e(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end()}.bind(this)),e(t).off(".joyride").on("resize.fndtn.joyride",n.throttle(function(){if(e("["+n.attr_name()+"]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t),n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1,!0)}},100))},start:function(){var t=this,n=e("["+this.attr_name()+"]",this.scope),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;if(!n.length>0)return;this.settings.init||this.events(),this.settings=n.data(this.attr_name(!0)+"-init"),this.settings.$content_el=n,this.settings.$body=e(this.settings.tip_container),this.settings.body_offset=e(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,typeof e.cookie!="function"&&(this.settings.cookie_monster=!1);if(!this.settings.cookie_monster||this.settings.cookie_monster&&!e.cookie(this.settings.cookie_name))this.settings.$tip_content.each(function(n){var s=e(this);this.settings=e.extend({},t.defaults,t.data_options(s));var o=i;while(o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")},resume:function(){this.set_li(),this.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(this.settings.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),n.append(e(this.settings.template.wrapper)),n.first().attr(this.add_namespace("data-index"),t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&this.settings.start_timer_on_click&&this.settings.timer>0||this.settings.timer===0?n="":n=e(this.settings.template.timer)[0].outerHTML,n},button_text:function(t){return this.settings.next_button?(t=e.trim(t)||"Next",t=e(this.settings.template.button).append(t)[0].outerHTML):t="",t},create:function(t){var n=t.$li.attr(this.add_namespace("data-button"))||t.$li.attr(this.add_namespace("data-text")),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tip_container).append(i)},show:function(t){var n=null;this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pause_after)===-1?(this.settings.paused?this.settings.paused=!1:this.set_li(t),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(t&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=e.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),n=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(n.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(n.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||e(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(e.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){e?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr(this.add_namespace("data-class")),r=this.settings.$li.attr(this.add_namespace("data-id")),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2,r=Math.ceil(this.settings.$target.offset().top-n+this.settings.$next_tip.outerHeight()),r!=0&&e("html, body").animate({scrollTop:r},this.settings.scroll_speed,"swing")},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pause_after)===-1},restart:function(){this.hide(),this.settings.$li=r,this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(o.outerWidth()/2),a=Math.ceil(o.outerHeight()/2),f=n||!1;f&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),typeof r=="undefined"&&(r=!1),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(o):(this.bottom()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.settings.$target.outerHeight(),left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.settings.$target.outerHeight(),left:this.settings.$target.offset().left}),this.nub_position(o,this.settings.tip_settings.nub_position,"top")):this.top()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-a,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-a,left:this.settings.$target.offset().left}),this.nub_position(o,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+u}),this.nub_position(o,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-u}),this.nub_position(o,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())),f&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=this.settings.$next_tip.outerHeight(),r=this.settings.$next_tip.offset(),i=this.settings.$target.outerHeight(),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(s.outerHeight()/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),u&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o}),s.addClass("top")),u&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(e){this.center(),e.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tip_animation)?t.show():t.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var n,r,i,s,o,u="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1)return t.console&&console.error("element not valid",i),!1;n=e(this.settings.template.expose),this.settings.$body.append(n),n.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(!0),height:i.outerHeight(!0)}),r=e(this.settings.template.expose_cover),s={zIndex:i.css("z-index"),position:i.css("position")},o=i.attr("class")==null?"":i.attr("class"),i.css("z-index",parseInt(n.css("z-index"))+1),s.position=="static"&&i.css("position","relative"),i.data("expose-css",s),i.data("orig-class",o),i.attr("class",o+" "+this.settings.expose_add_class),r.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(!0),height:i.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(r),n.addClass(u),r.addClass(u),i.data("expose",u),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,i),this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1)return t.console&&console.error("element not valid",r),!1;n=r.data("expose"),i=e("."+n),arguments.length>1&&(u=arguments[1]),u===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove(),s=r.data("expose-css"),s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex),s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position)),o=r.data("orig-class"),r.attr("class",o),r.removeData("orig-classes"),r.removeData("expose"),r.removeData("expose-z-index"),this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[],t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t),this.settings.exposed=this.settings.exposed||[],r=this.settings.exposed.length;while(r--)if(this.settings.exposed[r]==n){this.settings.exposed.splice(r,1);return}},center:function(){var n=e(t);return this.settings.$next_tip.css({top:(n.height()-this.settings.$next_tip.outerHeight())/2+n.scrollTop(),left:(n.width()-this.settings.$next_tip.outerWidth())/2+n.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+r.scrollLeft(),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();return s<f&&(s<0?f=0:f=s),u>a&&(a=u),[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),r.scrollLeft()>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookie_monster&&e.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip),e(".joyride-tip-guide").remove()},off:function(){e(this.scope).off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.2.1",settings:{use_tallest:!0,before_height_change:e.noop,after_height_change:e.noop},init:function(e,t,n){this.bindings(t,n),this.reflow()},events:function(){this.S(t).off(".equalizer").on("resize.fndtn.equalizer",function(e){this.reflow()}.bind(this))},equalize:function(t){var n=!1,r=t.find("["+this.attr_name()+"-watch]"),i=r.first().offset().top,s=t.data(this.attr_name(!0)+"-init");if(r.length===0)return;s.before_height_change(),t.trigger("before-height-change"),r.height("inherit"),r.each(function(){var t=e(this);t.offset().top!==i&&(n=!0)});if(n)return;var o=r.map(function(){return e(this).outerHeight()}).get();if(s.use_tallest){var u=Math.max.apply(null,o);r.css("height",u)}else{var a=Math.min.apply(null,o);r.css("height",a)}s.after_height_change(),t.trigger("after-height-change")},reflow:function(){var t=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){t.equalize(e(this))})}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.2.1",settings:{active_class:"open",align:"bottom",is_hover:!1,opened:function(){},closed:function(){}},init:function(e,t,n){Foundation.inherit(this,"throttle"),this.bindings(t,n)},events:function(n){var r=this,i=r.S;i(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(e){var t=i(this).data(r.attr_name(!0)+"-init")||r.settings;e.preventDefault(),(!t.is_hover||Modernizr.touch)&&r.toggle(i(this))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(e){var t=i(this);clearTimeout(r.timeout);if(t.data(r.data_attr()))var n=i("#"+t.data(r.data_attr())),s=t;else{var n=t;s=i("["+r.attr_name()+"='"+n.attr("id")+"']")}var o=s.data(r.attr_name(!0)+"-init")||r.settings;i(e.target).data(r.data_attr())&&o.is_hover&&r.closeall.call(r),o.is_hover&&r.open.apply(r,[n,s])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(e){var t=i(this);r.timeout=setTimeout(function(){if(t.data(r.data_attr())){var e=t.data(r.data_attr(!0)+"-init")||r.settings;e.is_hover&&r.close.call(r,i("#"+t.data(r.data_attr())))}else{var n=i("["+r.attr_name()+'="'+i(this).attr("id")+'"]'),e=n.data(r.attr_name(!0)+"-init")||r.settings;e.is_hover&&r.close.call(r,t)}}.bind(this),150)}).on("click.fndtn.dropdown",function(t){var n=i(t.target).closest("["+r.attr_name()+"-content]");if(i(t.target).data(r.data_attr())||i(t.target).parent().data(r.data_attr()))return;if(!i(t.target).data("revealId")&&n.length>0&&(i(t.target).is("["+r.attr_name()+"-content]")||e.contains(n.first()[0],t.target))){t.stopPropagation();return}r.close.call(r,i("["+r.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+r.attr_name()+"-content]",function(){r.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+r.attr_name()+"-content]",function(){r.settings.closed.call(this)}),i(t).off(".dropdown").on("resize.fndtn.dropdown",r.throttle(function(){r.resize.call(r)},50)),this.resize()},close:function(e){var t=this;e.each(function(){t.S(this).hasClass(t.settings.active_class)&&(t.S(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(t.settings.active_class),t.S(this).trigger("closed",[e]))})},closeall:function(){var t=this;e.each(t.S("["+this.attr_name()+"-content]"),function(){t.close.call(t,t.S(this))})},open:function(e,t){this.css(e.addClass(this.settings.active_class),t),e.trigger("opened",[e,t])},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(e){var t=this.S("#"+e.data(this.data_attr()));if(t.length===0)return;this.close.call(this,this.S("["+this.attr_name()+"-content]").not(t)),t.hasClass(this.settings.active_class)?this.close.call(this,t):(this.close.call(this,this.S("["+this.attr_name()+"-content]")),this.open.call(this,t,e))},resize:function(){var e=this.S("["+this.attr_name()+"-content].open"),t=this.S("["+this.attr_name()+"='"+e.attr("id")+"']");e.length&&t.length&&this.css(e,t)},css:function(e,t){this.clear_idx();if(this.small()){var n=this.dirs.bottom.call(e,t);e.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:n.top}),e.css(Foundation.rtl?"right":"left","2.5%")}else{var r=t.data(this.attr_name(!0)+"-init")||this.settings;this.style(e,t,r)}return e},style:function(t,n,r){var i=e.extend({position:"absolute"},this.dirs[r.align].call(t,n,r));t.attr("style","").css(i)},dirs:{_base:function(e){var t=this.offsetParent(),n=t.offset(),r=e.offset();return r.top-=n.top,r.left-=n.left,r},top:function(e,t){var n=Foundation.libs.dropdown,r=n.dirs._base.call(this,e),i=e.outerWidth()/2-8;return this.addClass("drop-top"),(e.outerWidth()<this.outerWidth()||n.small())&&n.adjust_pip(i,r),Foundation.rtl?{left:r.left-this.outerWidth()+e.outerWidth(),top:r.top-this.outerHeight()}:{left:r.left,top:r.top-this.outerHeight()}},bottom:function(e,t){var n=Foundation.libs.dropdown,r=n.dirs._base.call(this,e),i=e.outerWidth()/2-8;return(e.outerWidth()<this.outerWidth()||n.small())&&n.adjust_pip(i,r),n.rtl?{left:r.left-this.outerWidth()+e.outerWidth(),top:r.top+e.outerHeight()}:{left:r.left,top:r.top+e.outerHeight()}},left:function(e,t){var n=Foundation.libs.dropdown.dirs._base.call(this,e);return this.addClass("drop-left"),{left:n.left-this.outerWidth(),top:n.top}},right:function(e,t){var n=Foundation.libs.dropdown.dirs._base.call(this,e);return this.addClass("drop-right"),{left:n.left+e.outerWidth(),top:n.top}}},adjust_pip:function(e,t){var n=Foundation.stylesheet;this.small()&&(e+=t.left-8),this.rule_idx=n.cssRules.length;var r=".f-dropdown.open:before",i=".f-dropdown.open:after",s="left: "+e+"px;",o="left: "+(e-1)+"px;";n.insertRule?(n.insertRule([r,"{",s,"}"].join(" "),this.rule_idx),n.insertRule([i,"{",o,"}"].join(" "),this.rule_idx+1)):(n.addRule(r,s,this.rule_idx),n.addRule(i,o,this.rule_idx+1))},clear_idx:function(){var e=Foundation.stylesheet;this.rule_idx&&(e.deleteRule(this.rule_idx),e.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(t).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.2.1",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close"
,touch_label:"&larr;&nbsp;Swipe to Advance&nbsp;&rarr;",init:!1,locked:!1},init:function(e,t,n){var r=this;Foundation.inherit(this,"throttle image_loaded"),this.bindings(t,n),r.S(this.scope).is("["+this.attr_name()+"]")?this.assemble(r.S("li",this.scope)):r.S("["+this.attr_name()+"]",this.scope).each(function(){r.assemble(r.S("li",this))})},events:function(r){var i=this,s=i.S;e(".scroll-container").length>0&&(this.scope=e(".scroll-container")),s(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li",function(e,t,n){var t=t||s(this),n=n||t,r=t.next("li"),o=t.closest("["+i.attr_name()+"]").data(i.attr_name(!0)+"-init"),u=s(e.target);e.preventDefault(),o||(i.init(),o=t.closest("["+i.attr_name()+"]").data(i.attr_name(!0)+"-init")),n.hasClass("visible")&&t[0]===n[0]&&r.length>0&&i.is_open(t)&&(n=r,u=s("img",n)),i.open(u,t,n),i.update_paddles(n)}).on("click.fndtn.clearing",".clearing-main-next",function(e){i.nav(e,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(e){i.nav(e,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}),e(n).on("keydown.fndtn.clearing",function(e){i.keydown(e)}),s(t).off(".clearing").on("resize.fndtn.clearing",function(){i.resize()}),this.swipe_events(r)},swipe_events:function(e){var t=this,n=t.S;n(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};n(this).data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var r=n(this).data("swipe-transition");typeof r=="undefined"&&(r={}),r.delta_x=e.touches[0].pageX-r.start_page_x,typeof r.is_scrolling=="undefined"&&(r.is_scrolling=!!(r.is_scrolling||Math.abs(r.delta_x)<Math.abs(e.touches[0].pageY-r.start_page_y)));if(!r.is_scrolling&&!r.active){e.preventDefault();var i=r.delta_x<0?"next":"prev";r.active=!0,t.nav(e,i)}}).on("touchend.fndtn.clearing",".visible-img",function(e){n(this).data("swipe-transition",{}),e.stopPropagation()})},assemble:function(t){var n=t.parent();if(n.parent().hasClass("carousel"))return;n.after('<div id="foundationClearingHolder"></div>');var r=this.S("#foundationClearingHolder"),i=n.data(this.attr_name(!0)+"-init"),s=n.detach(),o={grid:'<div class="carousel">'+s[0].outerHTML+"</div>",viewing:i.templates.viewing},u='<div class="clearing-assembled"><div>'+o.viewing+o.grid+"</div></div>",a=this.settings.touch_label;Modernizr.touch&&(u=e(u).find(".clearing-touch-label").html(a).end()),r.after(u).remove()},open:function(t,r,i){function p(){setTimeout(function(){this.image_loaded(l,function(){l.outerWidth()===1&&!h?p.call(this):d.call(this,l)}.bind(this))}.bind(this),50)}function d(t){var n=e(t);t.css("visibility","visible"),o.css("overflow","hidden"),u.addClass("clearing-blackout"),a.addClass("clearing-container"),f.show(),this.fix_height(i).caption(s.S(".clearing-caption",f),s.S("img",i)).center_and_label(t,c).shift(r,i,function(){i.siblings().removeClass("visible"),i.addClass("visible")})}var s=this,o=e(n.body),u=i.closest(".clearing-assembled"),a=e("div",u).first(),f=e(".visible-img",a),l=e("img",f).not(t),c=e(".clearing-touch-label",".clearing-blackout"),h=!1;l.error(function(){h=!0}),this.locked()||(l.attr("src",this.load(t)).css("visibility","hidden"),p.call(this))},close:function(t,r){t.preventDefault();var i=function(e){return/blackout/.test(e.selector)?e:e.closest(".clearing-blackout")}(e(r)),s=e(n.body),o,u;return r===t.target&&i&&(s.css("overflow",""),o=e("div",i).first(),u=e(".visible-img",o),this.settings.prev_index=0,e("ul["+this.attr_name()+"]",i).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),o.removeClass("clearing-container"),u.hide()),!1},is_open:function(e){return e.parent().prop("style").length>0},keydown:function(t){var n=e(".clearing-blackout ul["+this.attr_name()+"]"),r=this.rtl?37:39,i=this.rtl?39:37,s=27;t.which===r&&this.go(n,"next"),t.which===i&&this.go(n,"prev"),t.which===s&&this.S("a.clearing-close").trigger("click")},nav:function(t,n){var r=e("ul["+this.attr_name()+"]",".clearing-blackout");t.preventDefault(),this.go(r,n)},resize:function(){var t=e("img",".clearing-blackout .visible-img"),n=e(".clearing-touch-label",".clearing-blackout");t.length&&this.center_and_label(t,n)},fix_height:function(e){var t=e.parent().children(),n=this;return t.each(function(){var e=n.S(this),t=e.find("img");e.height()>t.outerHeight()&&e.addClass("fix-height")}).closest("ul").width(t.length*100+"%"),this},update_paddles:function(e){var t=e.closest(".carousel").siblings(".visible-img");e.next().length>0?this.S(".clearing-main-next",t).removeClass("disabled"):this.S(".clearing-main-next",t).addClass("disabled"),e.prev().length>0?this.S(".clearing-main-prev",t).removeClass("disabled"):this.S(".clearing-main-prev",t).addClass("disabled")},center_and_label:function(e,t){return this.rtl?(e.css({marginRight:-(e.outerWidth()/2),marginTop:-(e.outerHeight()/2),left:"auto",right:"50%"}),t.length>0&&t.css({marginRight:-(t.outerWidth()/2),marginTop:-(e.outerHeight()/2)-t.outerHeight()-10,left:"auto",right:"50%"})):(e.css({marginLeft:-(e.outerWidth()/2),marginTop:-(e.outerHeight()/2)}),t.length>0&&t.css({marginLeft:-(t.outerWidth()/2),marginTop:-(e.outerHeight()/2)-t.outerHeight()-10})),this},load:function(e){if(e[0].nodeName==="A")var t=e.attr("href");else var t=e.parent().attr("href");return this.preload(e),t?t:e.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},img:function(e){if(e.length){var t=new Image,n=this.S("a",e);n.length?t.src=n.attr("href"):t.src=this.S("img",e).attr("src")}return this},caption:function(e,t){var n=t.attr("data-caption");return n?e.html(n).show():e.text("").hide(),this},go:function(e,t){var n=this.S(".visible",e),r=n[t]();r.length&&this.S("img",r).trigger("click",[n,r])},shift:function(e,t,n){var r=t.parent(),i=this.settings.prev_index||t.index(),s=this.direction(r,e,t),o=this.rtl?"right":"left",u=parseInt(r.css("left"),10),a=t.outerWidth(),f,l={};t.index()!==i&&!/skip/.test(s)?/left/.test(s)?(this.lock(),l[o]=u+a,r.animate(l,300,this.unlock())):/right/.test(s)&&(this.lock(),l[o]=u-a,r.animate(l,300,this.unlock())):/skip/.test(s)&&(f=t.index()-this.settings.up_count,this.lock(),f>0?(l[o]=-(f*a),r.animate(l,300,this.unlock())):(l[o]=0,r.animate(l,300,this.unlock()))),n()},direction:function(e,t,n){var r=this.S("li",e),i=r.outerWidth()+r.outerWidth()/4,s=Math.floor(this.S(".clearing-container").outerWidth()/i)-1,o=r.index(n),u;return this.settings.up_count=s,this.adjacent(this.settings.prev_index,o)?o>s&&o>this.settings.prev_index?u="right":o>s-1&&o<=this.settings.prev_index?u="left":u=!1:u="skip",this.settings.prev_index=o,u},adjacent:function(e,t){for(var n=t+1;n>=t-1;n--)if(n===e)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing"),this.S(t).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";var i=function(){},s=function(r,i){if(r.hasClass(i.slides_container_class))return this;var s=this,a,f=r,l,c,h,p=0,d,v=!1;s.cache={},s.slides=function(){return f.children(i.slide_selector)},s.slides().first().addClass(i.active_slide_class),s.update_slide_number=function(t){i.slide_number&&(l.find("span:first").text(parseInt(t)+1),l.find("span:last").text(s.slides().length)),i.bullets&&(c.children().removeClass(i.bullets_active_class),e(c.children().get(t)).addClass(i.bullets_active_class))},s.update_active_link=function(t){var n=e('[data-orbit-link="'+s.slides().eq(t).attr("data-orbit-slide")+'"]');n.siblings().removeClass(i.bullets_active_class),n.addClass(i.bullets_active_class)},s.build_markup=function(){f.wrap('<div class="'+i.container_class+'"></div>'),a=f.parent(),f.addClass(i.slides_container_class),i.navigation_arrows&&(a.append(e('<a href="#"><span></span></a>').addClass(i.prev_class)),a.append(e('<a href="#"><span></span></a>').addClass(i.next_class))),i.timer&&(h=e("<div>").addClass(i.timer_container_class),h.append("<span>"),h.append(e("<div>").addClass(i.timer_progress_class)),h.addClass(i.timer_paused_class),a.append(h)),i.slide_number&&(l=e("<div>").addClass(i.slide_number_class),l.append("<span></span> "+i.slide_number_text+" <span></span>"),a.append(l)),i.bullets&&(c=e("<ol>").addClass(i.bullets_container_class),a.append(c),c.wrap('<div class="orbit-bullets-container"></div>'),s.slides().each(function(t,n){var r=e("<li>").attr("data-orbit-slide",t);c.append(r)})),i.stack_on_small&&a.addClass(i.stack_on_small_class)},s._prepare_direction=function(t,n){var r="next";t<=p&&(r="prev"),i.animation==="slide"&&setTimeout(function(){f.removeClass("swipe-prev swipe-next"),r==="next"?f.addClass("swipe-next"):r==="prev"&&f.addClass("swipe-prev")},0);var o=s.slides();if(t>=o.length){if(!i.circular)return!1;t=0}else if(t<0){if(!i.circular)return!1;t=o.length-1}var u=e(o.get(p)),a=e(o.get(t));return[r,u,a,t]},s._goto=function(e,t){if(e===null)return!1;if(s.cache.animating)return!1;if(e===p)return!1;typeof s.cache.timer=="object"&&s.cache.timer.restart();var n=s.slides();s.cache.animating=!0;var r=s._prepare_direction(e),o=r[0],u=r[1],a=r[2],e=r[3];f.trigger("before-slide-change.fndtn.orbit"),i.before_slide_change(),p=e,u.css("transitionDuration",i.animation_speed+"ms"),a.css("transitionDuration",i.animation_speed+"ms");var l=function(){var r=function(){t===!0&&s.cache.timer.restart(),s.update_slide_number(p),a.addClass(i.active_slide_class),s.update_active_link(e),f.trigger("after-slide-change.fndtn.orbit",[{slide_number:p,total_slides:n.length}]),i.after_slide_change(p,n.length),setTimeout(function(){s.cache.animating=!1},100)};f.height()!=a.height()&&i.variable_height?f.animate({height:a.height()},250,"linear",r):r()};if(n.length===1)return l(),!1;var c=function(){o==="next"&&d.next(u,a,l),o==="prev"&&d.prev(u,a,l)};a.height()>f.height()&&i.variable_height?f.animate({height:a.height()},250,"linear",c):c()},s.next=function(e){e.stopImmediatePropagation(),e.preventDefault(),s._prepare_direction(p+1),setTimeout(function(){s._goto(p+1)},100)},s.prev=function(e){e.stopImmediatePropagation(),e.preventDefault(),s._prepare_direction(p-1),setTimeout(function(){s._goto(p-1)},100)},s.link_custom=function(t){t.preventDefault();var n=e(this).attr("data-orbit-link");if(typeof n=="string"&&(n=e.trim(n))!=""){var r=a.find("[data-orbit-slide="+n+"]");r.index()!=-1&&setTimeout(function(){s._goto(r.index())},100)}},s.link_bullet=function(t){var n=e(this).attr("data-orbit-slide");if(typeof n=="string"&&(n=e.trim(n))!="")if(isNaN(parseInt(n))){var r=a.find("[data-orbit-slide="+n+"]");r.index()!=-1&&setTimeout(function(){s._goto(r.index()+1)},100)}else setTimeout(function(){s._goto(parseInt(n))},100)},s.timer_callback=function(){s._goto(p+1,!0)},s.compute_dimensions=function(){var t=e(s.slides().get(p)),n=t.height();i.variable_height||s.slides().each(function(){e(this).height()>n&&(n=e(this).height())}),f.height(n)},s.create_timer=function(){var e=new o(a.find("."+i.timer_container_class),i,s.timer_callback);return e},s.stop_timer=function(){typeof s.cache.timer=="object"&&s.cache.timer.stop()},s.toggle_timer=function(){var e=a.find("."+i.timer_container_class);e.hasClass(i.timer_paused_class)?(typeof s.cache.timer=="undefined"&&(s.cache.timer=s.create_timer()),s.cache.timer.start()):typeof s.cache.timer=="object"&&s.cache.timer.stop()},s.init=function(){s.build_markup(),i.timer&&(s.cache.timer=s.create_timer(),Foundation.utils.image_loaded(this.slides().children("img"),s.cache.timer.start)),i.animation==="fade"&&f.addClass("fade"),d=new u(i,f),a.on("click","."+i.next_class,s.next),a.on("click","."+i.prev_class,s.prev),a.on("click","[data-orbit-slide]",s.link_bullet),a.on("click",s.toggle_timer),i.swipe&&f.on("touchstart.fndtn.orbit",function(e){if(s.cache.animating)return;e.touches||(e=e.originalEvent),s.cache.start_page_x=e.touches[0].pageX,s.cache.start_page_y=e.touches[0].pageY,s.cache.start_time=(new Date).getTime(),s.cache.delta_x=0,s.cache.is_scrolling=null,s.cache.direction=null,s.stop_timer()}).on("touchmove.fndtn.orbit",function(e){Math.abs(s.cache.delta_x)>5&&(e.preventDefault(),e.stopPropagation());if(s.cache.animating)return;requestAnimationFrame(function(){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;s.cache.delta_x=e.touches[0].pageX-s.cache.start_page_x,s.cache.is_scrolling===null&&(s.cache.is_scrolling=!!(s.cache.is_scrolling||Math.abs(s.cache.delta_x)<Math.abs(e.touches[0].pageY-s.cache.start_page_y)));if(s.cache.is_scrolling)return;var t=s.cache.delta_x<0?p+1:p-1;if(s.cache.direction!==t){var n=s._prepare_direction(t);s.cache.direction=t,s.cache.dir=n[0],s.cache.current=n[1],s.cache.next=n[2]}if(i.animation==="slide"){var r,o;r=s.cache.delta_x/a.width()*100,r>=0?o=-(100-r):o=100+r,s.cache.current.css("transform","translate3d("+r+"%,0,0)"),s.cache.next.css("transform","translate3d("+o+"%,0,0)")}})}).on("touchend.fndtn.orbit",function(e){if(s.cache.animating)return;e.preventDefault(),e.stopPropagation(),setTimeout(function(){s._goto(s.cache.direction)},50)}),a.on("mouseenter.fndtn.orbit",function(e){i.timer&&i.pause_on_hover&&s.stop_timer()}).on("mouseleave.fndtn.orbit",function(e){i.timer&&i.resume_on_mouseout&&s.cache.timer.start()}),e(n).on("click","[data-orbit-link]",s.link_custom),e(t).on("resize",s.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),s.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),function(){a.prev(".preloader").css("display","none"),s.update_slide_number(0),s.update_active_link(0),f.trigger("ready.fndtn.orbit")})},s.init()},o=function(e,t,n){var r=this,i=t.timer_speed,s=e.find("."+t.timer_progress_class),o,u,a=-1;this.update_progress=function(e){var t=s.clone();t.attr("style",""),t.css("width",e+"%"),s.replaceWith(t),s=t},this.restart=function(){clearTimeout(u),e.addClass(t.timer_paused_class),a=-1,r.update_progress(0),r.start()},this.start=function(){if(!e.hasClass(t.timer_paused_class))return!0;a=a===-1?i:a,e.removeClass(t.timer_paused_class),o=(new Date).getTime(),s.animate({width:"100%"},a,"linear"),u=setTimeout(function(){r.restart(),n()},a),e.trigger("timer-started.fndtn.orbit")},this.stop=function(){if(e.hasClass(t.timer_paused_class))return!0;clearTimeout(u),e.addClass(t.timer_paused_class);var n=(new Date).getTime();a-=n-o;var s=100-a/i*100;r.update_progress(s),e.trigger("timer-stopped.fndtn.orbit")}},u=function(e,t){var n="webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";this.next=function(e,r,i){r.on(n,function(t){r.unbind(n),e.removeClass("active animate-out"),r.removeClass("animate-in"),i()}),t.children().css({transform:"",transitionDuration:""}),e.addClass("animate-out"),r.addClass("animate-in")},this.prev=function(e,t,r){t.on(n,function(i){t.unbind(n),e.removeClass("active animate-out"),t.removeClass("animate-in"),r()}),e.css({transform:"",transitionDuration:""}).addClass("animate-out"),t.css({transform:"",transitionDuration:""}).addClass("animate-in")}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"5.2.1",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,circular:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:i,after_slide_change:i},init:function(e,t,n){var r=this;this.bindings(t,n)},events:function(e){var t=new s(this.S(e),this.S(e).data("orbit-init"));this.S(e).data(self.name+"-instance",t)},reflow:function(){var e=this;if(e.S(e.scope).is("[data-orbit]")){var t=e.S(e.scope),n=t.data(e.name+"-instance");n.compute_dimensions()}else e.S("[data-orbit]",e.scope).each(function(t,n){var r=e.S(n),i=e.data_options(r),s=r.data(e.name+"-instance");s.compute_dimensions()})}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.2.1",settings:{},init:function(e,t,n){this.events()},events:function(){var n=this.S;n(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(e){e.preventDefault(),n(this).closest(".off-canvas-wrap").toggleClass("move-right")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(e){e.preventDefault(),n(".off-canvas-wrap").removeClass("move-right")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(r){r.preventDefault();var i=e(this).attr("href");n(".off-canvas-wrap").on("transitionend webkitTransitionEnd oTransitionEnd",function(e){t.location=i,n(".off-canvas-wrap").off("transitionend webkitTransitionEnd oTransitionEnd")}),n(".off-canvas-wrap").removeClass("move-right")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(e){e.preventDefault(),n(this).closest(".off-canvas-wrap").toggleClass("move-left")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(e){e.preventDefault(),n(".off-canvas-wrap").removeClass("move-left")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(r){r.preventDefault();var i=e(this).attr("href");n(".off-canvas-wrap").on("transitionend webkitTransitionEnd oTransitionEnd",function(e){t.location=i,n(".off-canvas-wrap").off("transitionend webkitTransitionEnd oTransitionEnd")}),n(".off-canvas-wrap").removeClass("move-left")})},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.alert={name:"alert",version:"5.2.1",settings:{animation:"fadeOut",speed:300,callback:function(){}},init:function(e,t,n){this.bindings(t,n)},events:function(){var t=this,n=this.S;e(this.scope).off(".alert").on("click.fndtn.alert","["+this.attr_name()+"] a.close",function(e){var r=n(this).closest("["+t.attr_name()+"]"),i=r.data(t.attr_name(!0)+"-init")||t.settings;e.preventDefault(),r[i.animation](i.speed,function(){n(this).trigger("close").remove(),i.callback()})})},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";function i(e){var t=/fade/i.test(e),n=/pop/i.test(e);return{animate:t||n,pop:n,fade:t}}Foundation.libs.reveal={name:"reveal",version:"5.2.1",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",bg_class:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){e.extend(!0,this.settings,n,r),this.bindings(n,r)},events:function(e){var t=this,r=t.S;return r(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]",function(e){e.preventDefault();if(!t.locked){var n=r(this),i=n.data(t.data_attr("reveal-ajax"));t.locked=!0;if(typeof i=="undefined")t.open.call(t,n);else{var s=i===!0?n.attr("href"):i;t.open.call(t,n,{url:s})}}}),r(n).on("touchend.fndtn.reveal click.fndtn.reveal",this.close_targets(),function(e){e.preventDefault();if(!t.locked){var n=r("["+t.attr_name()+"].open").data(t.attr_name(!0)+"-init"),i=r(e.target)[0]===r("."+n.bg_class)[0];if(i){if(!n.close_on_background_click)return;e.stopPropagation()}t.locked=!0,t.close.call(t,i?r("["+t.attr_name()+"].open"):r(this).closest("["+t.attr_name()+"]"))}}),r("["+t.attr_name()+"]",this.scope).length>0?r(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):r(this.scope).on("open.fndtn.reveal","["+t.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+t.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+t.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+t.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+t.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+t.attr_name()+"]",this.close_video),!0},key_up_on:function(e){var t=this;return t.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(e){var n=t.S("["+t.attr_name()+"].open"),r=n.data(t.attr_name(!0)+"-init");r&&e.which===27&&r.close_on_esc&&!t.locked&&t.close.call(t,n)}),!0},key_up_off:function(e){return this.S("body").off("keyup.fndtn.reveal"),!0},open:function(t,n){var r=this;if(t)if(typeof t.selector!="undefined")var i=r.S("#"+t.data(r.data_attr("reveal-id")));else{var i=r.S(this.scope);n=t}else var i=r.S(this.scope);var s=i.data(r.attr_name(!0)+"-init");if(!i.hasClass("open")){var o=r.S("["+r.attr_name()+"].open");typeof i.data("css-top")=="undefined"&&i.data("css-top",parseInt(i.css("top"),10)).data("offset",this.cache_offset(i)),this.key_up_on(i),i.trigger("open"),o.length<1&&this.toggle_bg(i),typeof n=="string"&&(n={url:n});if(typeof n=="undefined"||!n.url)o.length>0&&this.hide(o,s.css.close),this.show(i,s.css.open);else{var u=typeof n.success!="undefined"?n.success:null;e.extend(n,{success:function(t,n,a){e.isFunction(u)&&u(t,n,a),i.html(t),r.S(i).foundation("section","reflow"),o.length>0&&r.hide(o,s.css.close),r.show(i,s.css.open)}}),e.ajax(n)}}},close:function(e){var e=e&&e.length?e:this.S(this.scope),t=this.S("["+this.attr_name()+"].open"),n=e.data(this.attr_name(!0)+"-init");t.length>0&&(this.locked=!0,this.key_up_off(e),e.trigger("close"),this.toggle_bg(e),this.hide(t,n.css.close,n))},close_targets:function(){var e="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?e+", ."+this.settings.bg_class:e},toggle_bg:function(t){var n=t.data(this.attr_name(!0));this.S("."+this.settings.bg_class).length===0&&(this.settings.bg=e("<div />",{"class":this.settings.bg_class}).appendTo("body").hide()),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,r){if(r){var s=n.data(this.attr_name(!0)+"-init");if(n.parent("body").length===0){var o=n.wrap('<div style="display: none;" />').parent(),u=this.settings.rootElement||"body";n.on("closed.fndtn.reveal.wrapped",function(){n.detach().appendTo(o),n.unwrap().unbind("closed.fndtn.reveal.wrapped")}),n.detach().appendTo(u)}var a=i(s.animation);a.animate||(this.locked=!1);if(a.pop){r.top=e(t).scrollTop()-n.data("offset")+"px";var f={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return setTimeout(function(){return n.css(r).animate(f,s.animation_speed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),s.animation_speed/2)}if(a.fade){r.top=e(t).scrollTop()+n.data("css-top")+"px";var f={opacity:1};return setTimeout(function(){return n.css(r).animate(f,s.animation_speed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),s.animation_speed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}var s=this.settings;return i(s.animation).fade?n.fadeIn(s.animation_speed/2):(this.locked=!1,n.show())},hide:function(n,r){if(r){var s=n.data(this.attr_name(!0)+"-init"),o=i(s.animation);o.animate||(this.locked=!1);if(o.pop){var u={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return setTimeout(function(){return n.animate(u,s.animation_speed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),s.animation_speed/2)}if(o.fade){var u={opacity:0};return setTimeout(function(){return n.animate(u,s.animation_speed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),s.animation_speed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}var s=this.settings;return i(s.animation).fade?n.fadeOut(s.animation_speed/2):n.hide()},close_video:function(t){var n=e(".flex-video",t.target),r=e("iframe",n);r.length>0&&(r.attr("data-src",r[0].src),r.attr("src","about:blank"),n.hide())},open_video:function(t){var n=e(".flex-video",t.target),i=n.find("iframe");if(i.length>0){var s=i.attr("data-src");if(typeof s=="string")i[0].src=i.attr("data-src");else{var o=i[0].src;i[0].src=r,i[0].src=o}n.show()}},data_attr:function(e){return this.namespace.length>0?this.namespace+"-"+e:e},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.interchange={name:"interchange",version:"5.2.1",cache:{},images_loaded:!1,nodes_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen",small:Foundation.media_queries.small,medium:Foundation.media_queries.medium,large:Foundation.media_queries.large,xlarge:Foundation.media_queries.xlarge,xxlarge:Foundation.media_queries.xxlarge,landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(t,n,r){if(/IMG/.test(t[0].nodeName)){var i=t[0].src;if((new RegExp(n,"i")).test(i))return;return t[0].src=n,r(t[0].src)}var s=t.data(this.data_attr+"-last-path");if(s==n)return;var o="/^.(.jpg|.jpeg|.png|.gif|.tiff|.bmp)??|#?./";return(new RegExp(o,"i")).test(n)?(e(t).css("background-image","url("+n+")"),t.data("interchange-last-path",n),r(n)):e.get(n,function(e){t.html(e),t.data(this.data_attr+"-last-path",n),r()})}}},init:function(t,n,r){Foundation.inherit(this,"throttle random_str"),this.data_attr=this.set_data_attr(),e.extend(!0,this.settings,n,r),this.bindings(n,r),this.load("images"),this.load("nodes")},get_media_hash:function(){var e="";for(var t in this.settings.named_queries)e+=matchMedia(this.settings.named_queries[t]).matches.toString();return e},events:function(){var n=this,r;return e(t).off(".interchange").on("resize.fndtn.interchange",n.throttle(function(){var e=n.get_media_hash();e!==r&&n.resize(),r=e},50)),this},resize:function(){var t=this.cache;if(!this.images_loaded||!this.nodes_loaded){setTimeout(e.proxy(this.resize,this),50);return}for(var n in t)if(t.hasOwnProperty(n)){var r=this.results(n,t[n]);r&&this.settings.directives[r.scenario[1]].call(this,r.el,r.scenario[0],function(){if(arguments[0]instanceof Array)var e=arguments[0];else var e=Array.prototype.slice.call(arguments,0);r.el.trigger(r.scenario[1],e)})}},results:function(e,t){var n=t.length;if(n>0){var r=this.S("["+this.add_namespace("data-uuid")+'="'+e+'"]');while(n--){var i,s=t[n][2];this.settings.named_queries.hasOwnProperty(s)?i=matchMedia(this.settings.named_queries[s]):i=matchMedia(s);if(i.matches)return{el:r,scenario:t[n]}}}return!1},load:function(e,t){return(typeof this["cached_"+e]=="undefined"||t)&&this["update_"+e](),this["cached_"+e]},update_images:function(){var e=this.S("img["+this.data_attr+"]"),t=e.length,n=t,r=0,i=this.data_attr;this.cache={},this.cached_images=[],this.images_loaded=t===0;while(n--){r++;if(e[n]){var s=e[n].getAttribute(i)||"";s.length>0&&this.cached_images.push(e[n])}r===t&&(this.images_loaded=!0,this.enhance("images"))}return this},update_nodes:function(){var e=this.S("["+this.data_attr+"]").not("img"),t=e.length,n=t,r=0,i=this.data_attr;this.cached_nodes=[],this.nodes_loaded=t===0;while(n--){r++;var s=e[n].getAttribute(i)||"";s.length>0&&this.cached_nodes.push(e[n]),r===t&&(this.nodes_loaded=!0,this.enhance("nodes"))}return this},enhance:function(n){var r=this["cached_"+n].length;while(r--)this.object(e(this["cached_"+n][r]));return e(t).trigger("resize")},parse_params:function(e,t,n){return[this.trim(e),this.convert_directive(t),this.trim(n)]},convert_directive:function(e){var t=this.trim(e);return t.length>0?t:"replace"},object:function(e){var t=this.parse_data_attr(e),n=[],r=t.length;if(r>0)while(r--){var i=t[r].split(/\((.*?)(\))$/);if(i.length>1){var s=i[0].split(","),o=this.parse_params(s[0],s[1],i[1]);n.push(o)}}return this.store(e,n)},store:function(e,t){var n=this.random_str(),r=e.data(this.add_namespace("uuid",!0));return this.cache[r]?this.cache[r]:(e.attr(this.add_namespace("data-uuid"),n),this.cache[n]=t)},trim:function(t){return typeof t=="string"?e.trim(t):t},set_data_attr:function(e){return e?this.namespace.length>0?this.namespace+"-"+this.settings.load_attr:this.settings.load_attr:this.namespace.length>0?"data-"+this.namespace+"-"+this.settings.load_attr:"data-"+this.settings.load_attr},parse_data_attr:function(e){var t=e.attr(this.attr_name()).split(/\[(.*?)\]/),n=t.length,r=[];while(n--)t[n].replace(/[\W\d]+/,"").length>4&&r.push(t[n]);return r},reflow:function(){this.load("images",!0),this.load("nodes",!0)}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs["magellan-expedition"]={name:"magellan-expedition",version:"5.2.1",settings:{active_class:"active",threshold:0,destination_threshold:20,throttle_delay:30},init:function(e,t,n){Foundation.inherit(this,"throttle"),this.bindings(t,n)},events:function(){var n=this,r=n.S,i=n.settings;n.set_expedition_position(),r(n.scope).off(".magellan").on("click.fndtn.magellan","["+n.add_namespace("data-magellan-arrival")+'] a[href^="#"]',function(r){r.preventDefault();var i=e(this).closest("["+n.attr_name()+"]"),s=i.data("magellan-expedition-init"),o=this.hash.split("#").join(""),u=e("a[name="+o+"]");u.length===0&&(u=e("#"+o));var a=u.offset().top;i.css("position")==="fixed"&&(a-=i.outerHeight()),e("html, body").stop().animate({scrollTop:a},700,"swing",function(){t.location.hash="#"+o})}).on("scroll.fndtn.magellan",n.throttle(this.check_for_arrivals.bind(this),i.throttle_delay)),e(t).on("resize.fndtn.magellan",n.throttle(this.set_expedition_position.bind(this),i.throttle_delay))},check_for_arrivals:function(){var e=this;e.update_arrivals(),e.update_expedition_positions()},set_expedition_position:function(){var t=this;e("["+this.attr_name()+"=fixed]",t.scope).each(function(n,r){var i=e(this),s=i.attr("styles"),o;i.attr("style",""),o=i.offset().top,i.data(t.data_attr("magellan-top-offset"),o),i.attr("style",s)})},update_expedition_positions:function(){var n=this,r=e(t).scrollTop();e("["+this.attr_name()+"=fixed]",n.scope).each(function(){var t=e(this),i=t.data("magellan-top-offset");if(r>=i){var s=t.prev("["+n.add_namespace("data-magellan-expedition-clone")+"]");s.length===0&&(s=t.clone(),s.removeAttr(n.attr_name()),s.attr(n.add_namespace("data-magellan-expedition-clone"),""),t.before(s)),t.css({position:"fixed",top:0})}else t.prev("["+n.add_namespace("data-magellan-expedition-clone")+"]").remove(),t.attr("style","")})},update_arrivals:function(){var n=this,r=e(t).scrollTop();e("["+this.attr_name()+"]",n.scope).each(function(){var t=e(this),i=i=t.data(n.attr_name(!0)+"-init"),s=n.offsets(t,r),o=t.find("["+n.add_namespace("data-magellan-arrival")+"]"),u=!1;s.each(function(e,r){if(r.viewport_offset>=r.top_offset){var s=t.find("["+n.add_namespace("data-magellan-arrival")+"]");return s.not(r.arrival).removeClass(i.active_class),r.arrival.addClass(i.active_class),u=!0,!0}}),u||o.removeClass(i.active_class)})},offsets:function(t,n){var r=this,i=t.data(r.attr_name(!0)+"-init"),s=n+i.destination_threshold;return t.find("["+r.add_namespace("data-magellan-arrival")+"]").map(function(t,n){var i=e(this).data(r.data_attr("magellan-arrival")),o=e("["+r.add_namespace("data-magellan-destination")+"="+i+"]");if(o.length>0){var u=o.offset().top;return{destination:o,arrival:e(this),top_offset:u,viewport_offset:s}}}).sort(function(e,t){return e.top_offset<t.top_offset?-1:e.top_offset>t.top_offset?1:0})},data_attr:function(e){return this.namespace.length>0?this.namespace+"-"+e:e},off:function(){this.S(this.scope).off(".magellan"),this.S(t).off(".magellan"
)},reflow:function(){var t=this;e("["+t.add_namespace("data-magellan-expedition-clone")+"]",t.scope).remove()}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.2.1",settings:{active_class:"active",toggleable:!0},init:function(e,t,n){this.bindings(t,n)},events:function(){var t=this,n=this.S;n(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] dd > a",function(r){var i=n(this).closest("["+t.attr_name()+"]"),s=n("#"+this.href.split("#")[1]),o=n("dd > .content",i),u=e("> dd",i),a=i.data(t.attr_name(!0)+"-init"),f=n("dd > .content."+a.active_class,i),l=n("dd."+a.active_class,i);r.preventDefault();if(!n(this).closest("dl").is(i))return;if(f[0]==s[0]&&a.toggleable)return l.toggleClass(a.active_class,!1),s.toggleClass(a.active_class,!1);o.removeClass(a.active_class),u.removeClass(a.active_class),s.addClass(a.active_class).parent().addClass(a.active_class)})},off:function(){},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"5.2.1",settings:{index:0,sticky_class:"sticky",custom_back_text:!0,back_text:"Back",is_hover:!0,mobile_show_parent_link:!1,scrolltop:!0,sticky_on:"all"},init:function(t,n,r){Foundation.inherit(this,"add_custom_rule register_media throttle");var i=this;i.register_media("topbar","foundation-mq-topbar"),this.bindings(n,r),i.S("["+this.attr_name()+"]",this.scope).each(function(){var t=e(this),n=t.data(i.attr_name(!0)+"-init"),r=i.S("section",this),s=t.children().filter("ul").first();t.data("index",0);var o=t.parent();o.hasClass("fixed")||i.is_sticky(t,o,n)?(i.settings.sticky_class=n.sticky_class,i.settings.sticky_topbar=t,t.data("height",o.outerHeight()),t.data("stickyoffset",o.offset().top)):t.data("height",t.outerHeight()),n.assembled||i.assemble(t),n.is_hover?i.S(".has-dropdown",t).addClass("not-click"):i.S(".has-dropdown",t).removeClass("not-click"),i.add_custom_rule(".f-topbar-fixed { padding-top: "+t.data("height")+"px }"),o.hasClass("fixed")&&i.S("body").addClass("f-topbar-fixed")})},is_sticky:function(e,t,n){var r=t.hasClass(n.sticky_class);return r&&n.sticky_on==="all"?!0:r&&this.small()&&n.sticky_on==="small"?!0:r&&this.medium()&&n.sticky_on==="medium"?!0:r&&this.large()&&n.sticky_on==="large"?!0:!1},toggle:function(n){var r=this;if(n)var i=r.S(n).closest("["+this.attr_name()+"]");else var i=r.S("["+this.attr_name()+"]");var s=i.data(this.attr_name(!0)+"-init"),o=r.S("section, .section",i);r.breakpoint()&&(r.rtl?(o.css({right:"0%"}),e(">.name",o).css({right:"100%"})):(o.css({left:"0%"}),e(">.name",o).css({left:"100%"})),r.S("li.moved",o).removeClass("moved"),i.data("index",0),i.toggleClass("expanded").css("height","")),s.scrolltop?i.hasClass("expanded")?i.parent().hasClass("fixed")&&(s.scrolltop?(i.parent().removeClass("fixed"),i.addClass("fixed"),r.S("body").removeClass("f-topbar-fixed"),t.scrollTo(0,0)):i.parent().removeClass("expanded")):i.hasClass("fixed")&&(i.parent().addClass("fixed"),i.removeClass("fixed"),r.S("body").addClass("f-topbar-fixed")):(r.is_sticky(i,i.parent(),s)&&i.parent().addClass("fixed"),i.parent().hasClass("fixed")&&(i.hasClass("expanded")?(i.addClass("fixed"),i.parent().addClass("expanded"),r.S("body").addClass("f-topbar-fixed")):(i.removeClass("fixed"),i.parent().removeClass("expanded"),r.update_sticky_positioning())))},timer:null,events:function(n){var r=this,i=this.S;i(this.scope).off(".topbar").on("click.fndtn.topbar","["+this.attr_name()+"] .toggle-topbar",function(e){e.preventDefault(),r.toggle(this)}).on("click.fndtn.topbar",'.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(t){var n=e(this).closest("li");r.breakpoint()&&!n.hasClass("back")&&!n.hasClass("has-dropdown")&&r.toggle()}).on("click.fndtn.topbar","["+this.attr_name()+"] li.has-dropdown",function(e){var t=i(this),n=i(e.target),s=t.closest("["+r.attr_name()+"]"),o=s.data(r.attr_name(!0)+"-init");if(n.data("revealId")){r.toggle();return}if(r.breakpoint())return;if(o.is_hover&&!Modernizr.touch)return;e.stopImmediatePropagation(),t.hasClass("hover")?(t.removeClass("hover").find("li").removeClass("hover"),t.parents("li.hover").removeClass("hover")):(t.addClass("hover"),n[0].nodeName==="A"&&n.parent().hasClass("has-dropdown")&&e.preventDefault())}).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown>a",function(e){if(r.breakpoint()){e.preventDefault();var t=i(this),n=t.closest("["+r.attr_name()+"]"),s=n.find("section, .section"),o=t.next(".dropdown").outerHeight(),u=t.closest("li");n.data("index",n.data("index")+1),u.addClass("moved"),r.rtl?(s.css({right:-(100*n.data("index"))+"%"}),s.find(">.name").css({right:100*n.data("index")+"%"})):(s.css({left:-(100*n.data("index"))+"%"}),s.find(">.name").css({left:100*n.data("index")+"%"})),n.css("height",t.siblings("ul").outerHeight(!0)+n.data("height"))}}),i(t).off(".topbar").on("resize.fndtn.topbar",r.throttle(function(){r.resize.call(r)},50)).trigger("resize"),i("body").off(".topbar").on("click.fndtn.topbar touchstart.fndtn.topbar",function(e){var t=i(e.target).closest("li").closest("li.hover");if(t.length>0)return;i("["+r.attr_name()+"] li").removeClass("hover")}),i(this.scope).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown .back",function(e){e.preventDefault();var t=i(this),n=t.closest("["+r.attr_name()+"]"),s=n.find("section, .section"),o=n.data(r.attr_name(!0)+"-init"),u=t.closest("li.moved"),a=u.parent();n.data("index",n.data("index")-1),r.rtl?(s.css({right:-(100*n.data("index"))+"%"}),s.find(">.name").css({right:100*n.data("index")+"%"})):(s.css({left:-(100*n.data("index"))+"%"}),s.find(">.name").css({left:100*n.data("index")+"%"})),n.data("index")===0?n.css("height",""):n.css("height",a.outerHeight(!0)+n.data("height")),setTimeout(function(){u.removeClass("moved")},300)})},resize:function(){var e=this;e.S("["+this.attr_name()+"]").each(function(){var t=e.S(this),r=t.data(e.attr_name(!0)+"-init"),i=t.parent("."+e.settings.sticky_class),s;if(!e.breakpoint()){var o=t.hasClass("expanded");t.css("height","").removeClass("expanded").find("li").removeClass("hover"),o&&e.toggle(t)}e.is_sticky(t,i,r)&&(i.hasClass("fixed")?(i.removeClass("fixed"),s=i.offset().top,e.S(n.body).hasClass("f-topbar-fixed")&&(s-=t.data("height")),t.data("stickyoffset",s),i.addClass("fixed")):(s=i.offset().top,t.data("stickyoffset",s)))})},breakpoint:function(){return!matchMedia(Foundation.media_queries.topbar).matches},small:function(){return matchMedia(Foundation.media_queries.small).matches},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},assemble:function(t){var n=this,r=t.data(this.attr_name(!0)+"-init"),i=n.S("section",t),s=e(this).children().filter("ul").first();i.detach(),n.S(".has-dropdown>a",i).each(function(){var t=n.S(this),i=t.siblings(".dropdown"),s=t.attr("href");if(!i.find(".title.back").length){if(r.mobile_show_parent_link&&s&&s.length>1)var o=e('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li><a class="parent-link js-generated" href="'+s+'">'+t.text()+"</a></li>");else var o=e('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');r.custom_back_text==1?e("h5>a",o).html(r.back_text):e("h5>a",o).html("&laquo; "+t.html()),i.prepend(o)}}),i.appendTo(t),this.sticky(),this.assembled(t)},assembled:function(t){t.data(this.attr_name(!0),e.extend({},t.data(this.attr_name(!0)),{assembled:!0}))},height:function(t){var n=0,r=this;return e("> li",t).each(function(){n+=r.S(this).outerHeight(!0)}),n},sticky:function(){var e=this.S(t),n=this;this.S(t).on("scroll",function(){n.update_sticky_positioning()})},update_sticky_positioning:function(){var e="."+this.settings.sticky_class,n=this.S(t),r=this;if(r.settings.sticky_topbar&&r.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var i=this.settings.sticky_topbar.data("stickyoffset");r.S(e).hasClass("expanded")||(n.scrollTop()>i?r.S(e).hasClass("fixed")||(r.S(e).addClass("fixed"),r.S("body").addClass("f-topbar-fixed")):n.scrollTop()<=i&&r.S(e).hasClass("fixed")&&(r.S(e).removeClass("fixed"),r.S("body").removeClass("f-topbar-fixed")))}},off:function(){this.S(this.scope).off(".fndtn.topbar"),this.S(t).off(".fndtn.topbar")},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.tab={name:"tab",version:"5.2.1",settings:{active_class:"active",callback:function(){},deep_linking:!1,scroll_to_content:!0},default_tab_hashes:[],init:function(e,t,n){var r=this,i=this.S;this.bindings(t,n),this.handle_location_hash_change(),i("["+this.attr_name()+"] > dd.active > a",this.scope).each(function(){r.default_tab_hashes.push(this.hash)})},events:function(){var e=this,n=this.S;n(this.scope).off(".tab").on("click.fndtn.tab","["+this.attr_name()+"] > dd > a",function(t){t.preventDefault(),t.stopPropagation(),e.toggle_active_tab(n(this).parent())}),n(t).on("hashchange.fndtn.tab",function(t){t.preventDefault(),e.handle_location_hash_change()})},handle_location_hash_change:function(){var t=this,n=this.S;n("["+this.attr_name()+"]",this.scope).each(function(){var i=n(this).data(t.attr_name(!0)+"-init");if(i.deep_linking){var s=t.scope.location.hash;if(s!=""){var o=n(s);if(o.hasClass("content")&&o.parent().hasClass("tab-content"))t.toggle_active_tab(e("["+t.attr_name()+"] > dd > a[href="+s+"]").parent());else{var u=o.closest(".content").attr("id");u!=r&&t.toggle_active_tab(e("["+t.attr_name()+"] > dd > a[href=#"+u+"]").parent(),s)}}else for(var a in t.default_tab_hashes)t.toggle_active_tab(e("["+t.attr_name()+"] > dd > a[href="+t.default_tab_hashes[a]+"]").parent())}})},toggle_active_tab:function(n,i){var s=this.S,o=n.closest("["+this.attr_name()+"]"),u=n.children("a").first(),a="#"+u.attr("href").split("#")[1],f=s(a),l=n.siblings(),c=o.data(this.attr_name(!0)+"-init");s(this).data(this.data_attr("tab-content"))&&(a="#"+s(this).data(this.data_attr("tab-content")).split("#")[1],f=s(a));if(c.deep_linking){var h=e("body,html").scrollTop();i!=r?t.location.hash=i:t.location.hash=a,c.scroll_to_content?i==r||i==a?n.parent()[0].scrollIntoView():s(a)[0].scrollIntoView():(i==r||i==a)&&e("body,html").scrollTop(h)}n.addClass(c.active_class).triggerHandler("opened"),l.removeClass(c.active_class),f.siblings().removeClass(c.active_class).end().addClass(c.active_class),c.callback(n),f.triggerHandler("toggled",[n]),o.triggerHandler("toggled",[f])},data_attr:function(e){return this.namespace.length>0?this.namespace+"-"+e:e},off:function(){},reflow:function(){}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.abide={name:"abide",version:"5.2.1",settings:{live_validate:!0,focus_on_invalid:!0,error_labels:!0,timeout:1e3,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^\d+$/,number:/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,url:/(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,datetime:/([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,time:/(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,dateISO:/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,month_day_year:/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(e,t,r){var i=n.getElementById(e.getAttribute(this.add_namespace("data-equalto"))).value,s=e.value,o=i===s;return o}}},timer:null,init:function(e,t,n){this.bindings(t,n)},events:function(t){var n=this,r=n.S(t).attr("novalidate","novalidate"),i=r.data(this.attr_name(!0)+"-init");this.invalid_attr=this.add_namespace("data-invalid"),r.off(".abide").on("submit.fndtn.abide validate.fndtn.abide",function(e){var t=/ajax/i.test(n.S(this).attr(n.attr_name()));return n.validate(n.S(this).find("input, textarea, select").get(),e,t)}).on("reset",function(){return n.reset(e(this))}).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(e){n.validate([this],e)}).on("keydown.fndtn.abide",function(t){var r=e(this).closest("form").data(n.attr_name(!0)+"-init");r.live_validate===!0&&(clearTimeout(n.timer),n.timer=setTimeout(function(){n.validate([this],t)}.bind(this),r.timeout))})},reset:function(t){t.removeAttr(this.invalid_attr),e(this.invalid_attr,t).removeAttr(this.invalid_attr),e(".error",t).not("small").removeClass("error")},validate:function(e,t,n){var r=this.parse_patterns(e),i=r.length,s=this.S(e[0]).closest("form"),o=/submit/.test(t.type);for(var u=0;u<i;u++)if(!r[u]&&(o||n))return this.settings.focus_on_invalid&&e[u].focus(),s.trigger("invalid"),this.S(e[u]).closest("form").attr(this.invalid_attr,""),!1;return(o||n)&&s.trigger("valid"),s.removeAttr(this.invalid_attr),n?!1:!0},parse_patterns:function(e){var t=e.length,n=[];while(t--)n.push(this.pattern(e[t]));return this.check_validation_and_apply_styles(n)},pattern:function(e){var t=e.getAttribute("type"),n=typeof e.getAttribute("required")=="string",r=e.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(r)&&r.length>0?[e,this.settings.patterns[r],n]:r.length>0?[e,new RegExp(r),n]:this.settings.patterns.hasOwnProperty(t)?[e,this.settings.patterns[t],n]:(r=/.*/,[e,r,n])},check_validation_and_apply_styles:function(t){var n=t.length,r=[];while(n--){var i=t[n][0],s=t[n][2],o=i.value,u=this.S(i).parent(),a=i.getAttribute(this.add_namespace("data-abide-validator")),f=i.type==="radio",l=i.type==="checkbox",c=this.S('label[for="'+i.getAttribute("id")+'"]'),h=s?i.value.length>0:!0,p,d;i.getAttribute(this.add_namespace("data-equalto"))&&(a="equalTo"),u.is("label")?p=u.parent():p=u,f&&s?r.push(this.valid_radio(i,s)):l&&s?r.push(this.valid_checkbox(i,s)):a?(d=this.settings.validators[a].apply(this,[i,s,p]),r.push(d),d?(this.S(i).removeAttr(this.invalid_attr),p.removeClass("error")):(this.S(i).attr(this.invalid_attr,""),p.addClass("error"))):t[n][1].test(o)&&h||!s&&i.value.length<1||e(i).attr("disabled")?(this.S(i).removeAttr(this.invalid_attr),p.removeClass("error"),c.length>0&&this.settings.error_labels&&c.removeClass("error"),r.push(!0),e(i).triggerHandler("valid")):(this.S(i).attr(this.invalid_attr,""),p.addClass("error"),c.length>0&&this.settings.error_labels&&c.addClass("error"),r.push(!1),e(i).triggerHandler("invalid"))}return r},valid_checkbox:function(e,t){var e=this.S(e),n=e.is(":checked")||!t;return n?e.removeAttr(this.invalid_attr).parent().removeClass("error"):e.attr(this.invalid_attr,"").parent().addClass("error"),n},valid_radio:function(e,t){var r=e.getAttribute("name"),i=n.getElementsByName(r),s=i.length,o=!1;for(var u=0;u<s;u++)i[u].checked&&(o=!0);for(var u=0;u<s;u++)o?this.S(i[u]).removeAttr(this.invalid_attr).parent().removeClass("error"):this.S(i[u]).attr(this.invalid_attr,"").parent().addClass("error");return o}}}(jQuery,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.2.1",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,tip_template:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(e,t,n){Foundation.inherit(this,"random_str"),this.bindings(t,n)},events:function(t){var n=this,r=n.S;n.create(this.S(t)),e(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]:not(a)",function(t){var i=r(this),s=e.extend({},n.settings,n.data_options(i)),o=!1;if(/mouse/i.test(t.type)&&n.ie_touch(t))return!1;if(i.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(t.type)&&t.preventDefault(),n.hide(i);else{if(s.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(t.type))return;!s.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(t.type)&&(t.preventDefault(),r(s.tooltip_class+".open").hide(),o=!0),/enter|over/i.test(t.type)?this.timer=setTimeout(function(){var e=n.showTip(i)}.bind(this),n.settings.hover_delay):t.type==="mouseout"||t.type==="mouseleave"?(clearTimeout(this.timer),n.hide(i)):n.showTip(i)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(t){if(/mouse/i.test(t.type)&&n.ie_touch(t))return!1;if(e(this).data("tooltip-open-event-type")=="touch"&&t.type=="mouseleave")return;e(this).data("tooltip-open-event-type")=="mouse"&&/MSPointerDown|touchstart/i.test(t.type)?n.convert_to_touch(e(this)):n.hide(e(this))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(e){n.hide(r(this))})},ie_touch:function(e){return!1},showTip:function(e){var t=this.getTip(e);return this.show(e)},getTip:function(t){var n=this.selector(t),r=e.extend({},this.settings,this.data_options(t)),i=null;return n&&(i=this.S('span[data-selector="'+n+'"]'+r.tooltip_class)),typeof i=="object"?i:!1},selector:function(e){var t=e.attr("id"),n=e.attr(this.attr_name())||e.attr("data-selector");return(t&&t.length<1||!t)&&typeof n!="string"&&(n=this.random_str(6),e.attr("data-selector",n)),t&&t.length>0?t:n},create:function(n){var r=this,i=e.extend({},this.settings,this.data_options(n)),s=this.settings.tip_template;typeof i.tip_template=="string"&&t.hasOwnProperty(i.tip_template)&&(s=t[i.tip_template]);var o=e(s(this.selector(n),e("<div></div>").html(n.attr("title")).html())),u=this.inheritable_classes(n);o.addClass(u).appendTo(i.append_to),Modernizr.touch&&(o.append('<span class="tap-to-close">'+i.touch_close_text+"</span>"),o.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(e){r.hide(n)})),n.removeAttr("title").attr("title","")},reposition:function(t,n,r){var i,s,o,u,a,f;n.css("visibility","hidden").show(),i=t.data("width"),s=n.children(".nub"),o=s.outerHeight(),u=s.outerHeight(),this.small()?n.css({width:"100%"}):n.css({width:i?i:"auto"}),f=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto"}).end()},f(n,t.offset().top+t.outerHeight()+10,"auto","auto",t.offset().left);if(this.small())f(n,t.offset().top+t.outerHeight()+10,"auto","auto",12.5,e(this.scope).width()),n.addClass("tip-override"),f(s,-o,"auto","auto",t.offset().left);else{var l=t.offset().left;Foundation.rtl&&(s.addClass("rtl"),l=t.offset().left+t.outerWidth()-n.outerWidth()),f(n,t.offset().top+t.outerHeight()+10,"auto","auto",l),n.removeClass("tip-override"),r&&r.indexOf("tip-top")>-1?(Foundation.rtl&&s.addClass("rtl"),f(n,t.offset().top-n.outerHeight(),"auto","auto",l).removeClass("tip-override")):r&&r.indexOf("tip-left")>-1?(f(n,t.offset().top+t.outerHeight()/2-n.outerHeight()/2,"auto","auto",t.offset().left-n.outerWidth()-o).removeClass("tip-override"),s.removeClass("rtl")):r&&r.indexOf("tip-right")>-1&&(f(n,t.offset().top+t.outerHeight()/2-n.outerHeight()/2,"auto","auto",t.offset().left+t.outerWidth()+o).removeClass("tip-override"),s.removeClass("rtl"))}n.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches},inheritable_classes:function(t){var n=e.extend({},this.settings,this.data_options(t)),r=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(n.additional_inheritable_classes),i=t.attr("class"),s=i?e.map(i.split(" "),function(t,n){if(e.inArray(t,r)!==-1)return t}).join(" "):"";return e.trim(s)},convert_to_touch:function(t){var n=this,r=n.getTip(t),i=e.extend({},n.settings,n.data_options(t));r.find(".tap-to-close").length===0&&(r.append('<span class="tap-to-close">'+i.touch_close_text+"</span>"),r.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(e){n.hide(t)})),t.data("tooltip-open-event-type","touch")},show:function(e){var t=this.getTip(e);e.data("tooltip-open-event-type")=="touch"&&this.convert_to_touch(e),this.reposition(e,t,e.attr("class")),e.addClass("open"),t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150,function(){t.find(".tap-to-close").remove(),t.off("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),e.removeClass("open")})},off:function(){var t=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(n){e("["+t.attr_name()+"]").get(n).attr("title",e(this).text())}).remove()},reflow:function(){}}}(jQuery,this,this.document);
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.2.1',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      var S = this.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  var noop = function() {};

  var Orbit = function(el, settings) {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class)) {
      return this;
    }

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        adjust_height_after = false;

    self.cache = {};

    self.slides = function() {
      return slides_container.children(settings.slide_selector);
    };

    self.slides().first().addClass(settings.active_slide_class);

    self.update_slide_number = function(index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index)+1);
        number_container.find('span:last').text(self.slides().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function(index) {
      var link = $('[data-orbit-link="'+self.slides().eq(index).attr('data-orbit-slide')+'"]');
      link.siblings().removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function() {
      slides_container.wrap('<div class="'+settings.container_class+'"></div>');
      container = slides_container.parent();
      slides_container.addClass(settings.slides_container_class);
      
      if (settings.navigation_arrows) {
        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
      }

      if (settings.timer) {
        timer_container = $('<div>').addClass(settings.timer_container_class);
        timer_container.append('<span>');
        timer_container.append($('<div>').addClass(settings.timer_progress_class));
        timer_container.addClass(settings.timer_paused_class);
        container.append(timer_container);
      }

      if (settings.slide_number) {
        number_container = $('<div>').addClass(settings.slide_number_class);
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
        container.append(number_container);
      }

      if (settings.bullets) {
        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
        container.append(bullets_container);
        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
        self.slides().each(function(idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx);
          bullets_container.append(bullet);
        });
      }

      if (settings.stack_on_small) {
        container.addClass(settings.stack_on_small_class);
      }
    };

    self._prepare_direction = function(next_idx, current_direction) {
      var dir = 'next';
      if (next_idx <= idx) { dir = 'prev'; }
      
      if (settings.animation === 'slide') {    
        setTimeout(function(){
          slides_container.removeClass("swipe-prev swipe-next");
          if (dir === 'next') {slides_container.addClass("swipe-next");}
          else if (dir === 'prev') {slides_container.addClass("swipe-prev");}
        },0);
      }
      
      var slides = self.slides();
      if (next_idx >= slides.length) {
        if (!settings.circular) return false;
        next_idx = 0;
      } else if (next_idx < 0) {
        if (!settings.circular) return false;
        next_idx = slides.length - 1;
      }
      var current = $(slides.get(idx))
        , next = $(slides.get(next_idx));
      

      return [dir, current, next, next_idx];
    };

    self._goto = function(next_idx, start_timer) {
      if (next_idx === null) {return false;}
      if (self.cache.animating) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof self.cache.timer === 'object') {self.cache.timer.restart();}
      
      var slides = self.slides();
      self.cache.animating = true;
      var res = self._prepare_direction(next_idx)
        , dir = res[0]
        , current = res[1]
        , next = res[2]
        , next_idx = res[3];

      slides_container.trigger('before-slide-change.fndtn.orbit');
      settings.before_slide_change();
      idx = next_idx;

      current.css("transitionDuration", settings.animation_speed+"ms");
      next.css("transitionDuration", settings.animation_speed+"ms");
      
      var callback = function() {
        var unlock = function() {
          if (start_timer === true) {self.cache.timer.restart();}
          self.update_slide_number(idx);
          next.addClass(settings.active_slide_class);
          self.update_active_link(next_idx);
          slides_container.trigger('after-slide-change.fndtn.orbit',[{slide_number: idx, total_slides: slides.length}]);
          settings.after_slide_change(idx, slides.length);
          setTimeout(function(){
            self.cache.animating = false;
          }, 100);
          
        };
        if (slides_container.height() != next.height() && settings.variable_height) {
          slides_container.animate({'height': next.height()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function() {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}        
      };

      if (next.height() > slides_container.height() && settings.variable_height) {
        slides_container.animate({'height': next.height()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };
    
    self.next = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._prepare_direction(idx + 1);
      setTimeout(function(){
        self._goto(idx + 1);
    }, 100);
    };
    
    self.prev = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._prepare_direction(idx - 1);
      setTimeout(function(){
        self._goto(idx - 1)
      }, 100);
    };

    self.link_custom = function(e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != "") {
        var slide = container.find('[data-orbit-slide='+link+']');
        if (slide.index() != -1) {
          setTimeout(function(){
            self._goto(slide.index());
          },100);
        }
      }
    };

    self.link_bullet = function(e) {    
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != "") {
        if(isNaN(parseInt(index)))
        {
          var slide = container.find('[data-orbit-slide='+index+']');
          if (slide.index() != -1) {
            setTimeout(function(){
              self._goto(slide.index() + 1);
            },100);
          }
        }
        else
        {
          setTimeout(function(){
            self._goto(parseInt(index));
          },100);
        }
      }

    }

    self.timer_callback = function() {
      self._goto(idx + 1, true);
    }
    
    self.compute_dimensions = function() {
      var current = $(self.slides().get(idx));
      var h = current.height();
      if (!settings.variable_height) {
        self.slides().each(function(){
          if ($(this).height() > h) { h = $(this).height(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function() {
      var t = new Timer(
        container.find('.'+settings.timer_container_class), 
        settings, 
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function() {
      if (typeof self.cache.timer === 'object') self.cache.timer.stop();
    };

    self.toggle_timer = function() {
      var t = container.find('.'+settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof self.cache.timer === 'undefined') {self.cache.timer = self.create_timer();}
        self.cache.timer.start();     
      }
      else {
        if (typeof self.cache.timer === 'object') {self.cache.timer.stop();}
      }
    };

    self.init = function() {
      self.build_markup();
      if (settings.timer) {
        self.cache.timer = self.create_timer(); 
        Foundation.utils.image_loaded(this.slides().children('img'), self.cache.timer.start);
      }
      // animate = new FadeAnimation(settings, slides_container);
      // if (settings.animation === 'slide') 
      //   animate = new SlideAnimation(settings, slides_container);
      if(settings.animation === 'fade') {slides_container.addClass('fade');}
      animate = new CSSAnimation(settings, slides_container);
      container.on('click', '.'+settings.next_class, self.next);
      container.on('click', '.'+settings.prev_class, self.prev);

      container.on('click', '[data-orbit-slide]', self.link_bullet);
      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        slides_container.on('touchstart.fndtn.orbit',function(e) {
          if (self.cache.animating) {return;}
          if (!e.touches) {e = e.originalEvent;}

          self.cache.start_page_x = e.touches[0].pageX;
          self.cache.start_page_y = e.touches[0].pageY;
          self.cache.start_time = (new Date()).getTime();
          self.cache.delta_x = 0;
          self.cache.is_scrolling = null;
          self.cache.direction = null;
          
          self.stop_timer(); // does not appear to prevent callback from occurring          
        })
        .on('touchmove.fndtn.orbit',function(e) {
          if (Math.abs(self.cache.delta_x) > 5) {
            e.preventDefault();
            e.stopPropagation();
          }

          if (self.cache.animating) {return;}          
          requestAnimationFrame(function(){
            if (!e.touches) { e = e.originalEvent; }

            // Ignore pinch/zoom events
            if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

            self.cache.delta_x = e.touches[0].pageX - self.cache.start_page_x;

            if (self.cache.is_scrolling === null) {
              self.cache.is_scrolling = !!( self.cache.is_scrolling || Math.abs(self.cache.delta_x) < Math.abs(e.touches[0].pageY - self.cache.start_page_y) );
            }

            if (self.cache.is_scrolling) {
              return;
            }
            
            var direction = (self.cache.delta_x < 0) ? (idx+1) : (idx-1);
            if (self.cache.direction !== direction) {
              var res = self._prepare_direction(direction);
              self.cache.direction = direction;
              self.cache.dir = res[0];
              self.cache.current = res[1];
              self.cache.next = res[2];
            }

            if (settings.animation === 'slide') {
              var offset, next_offset;
              
              offset = (self.cache.delta_x / container.width()) * 100;
              if (offset >= 0) {next_offset = -(100 - offset);}
              else {next_offset = 100 + offset;}

              self.cache.current.css("transform","translate3d("+offset+"%,0,0)");
              self.cache.next.css("transform","translate3d("+next_offset+"%,0,0)");
            }
          });
        })
        .on('touchend.fndtn.orbit', function(e) {
          if (self.cache.animating) {return;}
          e.preventDefault();
          e.stopPropagation();
          setTimeout(function(){
            self._goto(self.cache.direction);
          }, 50);
        });
      }
      container.on('mouseenter.fndtn.orbit', function(e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function(e) {
        if (settings.timer && settings.resume_on_mouseout) {
          self.cache.timer.start();
        }
      });
      
      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('resize', self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), function() {
        container.prev('.preloader').css('display', 'none');
        self.update_slide_number(0);
        self.update_active_link(0);
        slides_container.trigger('ready.fndtn.orbit');
      });
    };

    self.init();
  };

  var Timer = function(el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.'+settings.timer_progress_class),
        start, 
        timeout,
        left = -1;

    this.update_progress = function(w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w+'%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function() {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
      self.start();
    };

    this.start = function() {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width': '100%'}, left, 'linear');
      timeout = setTimeout(function() {
        self.restart();
        callback();
      }, left);
      el.trigger('timer-started.fndtn.orbit')
    };

    this.stop = function() {
      if (el.hasClass(settings.timer_paused_class)) {return true;}
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      var end = new Date().getTime();
      left = left - (end - start);
      var w = 100 - ((left / duration) * 100);
      self.update_progress(w);
      el.trigger('timer-stopped.fndtn.orbit');
    };
  };

  var CSSAnimation = function(settings, container) {
    var animation_end = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";

    this.next = function(current, next, callback) {
      next.on(animation_end, function(e){
        next.unbind(animation_end);
        current.removeClass("active animate-out");
        next.removeClass("animate-in");
        callback();
      });
      container.children().css({
        "transform":"", 
        "transitionDuration":""
      });
      current.addClass("animate-out");
      next.addClass("animate-in");
    };

    this.prev = function(current, prev, callback) {
      prev.on(animation_end, function(e){
        prev.unbind(animation_end);
        current.removeClass("active animate-out");
        prev.removeClass("animate-in");
        callback();
      });
      current.css({"transform":"", "transitionDuration":""}).addClass("animate-out");
      prev.css({"transform":"", "transitionDuration":""}).addClass("animate-in");
    };
  };


  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '5.2.1',

    settings: {
      animation: 'slide',
      timer_speed: 10000,
      pause_on_hover: true,
      resume_on_mouseout: false,
      animation_speed: 500,
      stack_on_small: false,
      navigation_arrows: true,
      slide_number: true,
      slide_number_text: 'of',
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      slide_selector: '*',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning',
      bullets: true,
      circular: true,
      timer: true,
      variable_height: false,
      swipe: true,
      before_slide_change: noop,
      after_slide_change: noop
    },

    init : function (scope, method, options) {
      var self = this;
      this.bindings(method, options);
    },

    events : function (instance) {
      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
      this.S(instance).data(self.name + '-instance', orbit_instance);
    },

    reflow : function () {
      var self = this;

      if (self.S(self.scope).is('[data-orbit]')) {
        var $el = self.S(self.scope);
        var instance = $el.data(self.name + '-instance');
        instance.compute_dimensions();
      } else {
        self.S('[data-orbit]', self.scope).each(function(idx, el) {
          var $el = self.S(el);
          var opts = self.data_options($el);
          var instance = $el.data(self.name + '-instance');
          instance.compute_dimensions();
        });
      }
    }
  };

    
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.2.1',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animation_speed: 250,
      close_on_background_click: true,
      close_on_esc: true,
      dismiss_modal_class: 'close-reveal-modal',
      bg_class: 'reveal-modal-bg',
      open: function(){},
      opened: function(){},
      close: function(){},
      closed: function(){},
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity': 0,
          'visibility': 'visible',
          'display' : 'block'
        },
        close : {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },

    init : function (scope, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.reveal')
        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = S(this),
                ajax = element.data(self.data_attr('reveal-ajax'));

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;

              self.open.call(self, element, {url: url});
            }
          }
        });

      S(document)
        .on('touchend.fndtn.reveal click.fndtn.reveal', this.close_targets(), function (e) {

          e.preventDefault();

          if (!self.locked) {
            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init'),
                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

            if (bg_clicked) {
              if (settings.close_on_background_click) {
                e.stopPropagation();
              } else {
                return;
              }
            }

            self.locked = true;
            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open') : S(this).closest('[' + self.attr_name() + ']'));
          }
        });

      if(S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', this.settings.open)
          .on('opened.fndtn.reveal', this.settings.opened)
          .on('opened.fndtn.reveal', this.open_video)
          .on('close.fndtn.reveal', this.settings.close)
          .on('closed.fndtn.reveal', this.settings.closed)
          .on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on : function (scope) {
      var self = this;

      // PATCH #1: fixing multiple keyup event trigger from single key press
      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init');
        // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off : function (scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },

    open : function (target, ajax_settings) {
      var self = this;
      if (target) {
        if (typeof target.selector !== 'undefined') {
          var modal = self.S('#' + target.data(self.data_attr('reveal-id')));
        } else {
          var modal = self.S(this.scope);

          ajax_settings = target;
        }
      } else {
        var modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('open');

        if (open_modal.length < 1) {
          this.toggle_bg(modal);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url: ajax_settings
          };
        }

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          if (open_modal.length > 0) {
            this.hide(open_modal, settings.css.close);
          }

          this.show(modal, settings.css.open);
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                old_success(data, textStatus, jqXHR);
              }

              modal.html(data);
              self.S(modal).foundation('section', 'reflow');

              if (open_modal.length > 0) {
                self.hide(open_modal, settings.css.close);
              }
              self.show(modal, settings.css.open);
            }
          });

          $.ajax(ajax_settings);
        }
      }
    },

    close : function (modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init');

      if (open_modals.length > 0) {
        this.locked = true;
        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('close');
        this.toggle_bg(modal);
        this.hide(open_modals, settings.css.close, settings);
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },

    toggle_bg : function (modal) {
      var settings = modal.data(this.attr_name(true));

      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
          .appendTo('body').hide();
      }

      if (this.settings.bg.filter(':visible').length > 0) {
        this.hide(this.settings.bg);
      } else {
        this.show(this.settings.bg);
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        if (el.parent('body').length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent(),
              rootElement = this.settings.rootElement || 'body';

          el.on('closed.fndtn.reveal.wrapped', function() {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });

          el.detach().appendTo(rootElement);
        }

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          css.top = $(window).scrollTop() + el.data('css-top') + 'px';
          var end_css = {opacity: 1};

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;

      return el.show();
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {opacity: 0};

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', 'about:blank');
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10);

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };

  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate: fade || pop,
      pop: pop,
      fade: fade
    };
  }
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.slider = {
    name : 'slider',

    version : '5.2.1',

    settings: {
      start: 0,
      end: 100,
      step: 1,
      initial: null,
      display_selector: '',
      on_change: function(){}
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this,'throttle');
      this.bindings(method, options);
      this.reflow();
    },

    events : function() {
      var self = this;

      $(this.scope)
        .off('.slider')
        .on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider', '[' + self.attr_name() + '] .range-slider-handle', function(e) {
          if (!self.cache.active) {
            self.set_active_slider($(e.target));
          }
        })
        .on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider', function(e) {
          if (!!self.cache.active) {
            e.preventDefault(); 
            self.calculate_position(self.cache.active, e.pageX || e.originalEvent.touches[0].clientX || e.currentPoint.x);
          }
        })
        .on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function(e) {
          self.remove_active_slider();
        })
        .on('change.fndtn.slider', function(e) {
          self.settings.on_change;
        });

      self.S(window)
        .on('resize.fndtn.slider', self.throttle(function(e) {
          self.reflow();
        }, 300));
    },

    set_active_slider : function($handle) {
      this.cache.active = $handle;
    },

    remove_active_slider : function() {
      this.cache.active = null;
    },

    calculate_position : function($handle, cursor_x) {
      var self = this,
          settings = $.extend({}, self.settings, self.data_options($handle.parent())),
          handle_w = $.data($handle[0], 'handle_w'),
          handle_o = $.data($handle[0], 'handle_o'),
          bar_w = $.data($handle[0], 'bar_w'),
          bar_o = $.data($handle[0], 'bar_o');

      requestAnimationFrame(function(){
        var pct = self.limit_to((((cursor_x)-bar_o)/bar_w),0,1),
            norm = self.normalized_value(pct, settings.start, settings.end, settings.step);

        self.set_ui($handle, norm);
      }); 
    },

    set_ui : function($handle, value) {
      var settings = $.extend({}, this.settings, this.data_options($handle.parent())),
          handle_w = $.data($handle[0], 'handle_w'),
          bar_w = $.data($handle[0], 'bar_w'),
          norm_pct = this.normalized_percentage(value, settings.start, settings.end),
          handle_offset = norm_pct*(bar_w-handle_w)-1,
          progress_bar_width = norm_pct*100;

      this.set_translate($handle, handle_offset);
      $handle.siblings('.range-slider-active-segment').css('width', progress_bar_width+'%');
      
      $handle.parent().attr(this.attr_name(), value);
      $handle.parent().trigger('change');

      $handle.parent().children('input[type=hidden]').val(value);

      if (settings.input_id != '') {
        $(settings.display_selector).each(function(){
          if (this.hasOwnProperty('value')) {
            $(this).val(value);
          } else {
            $(this).text(value);
          }
        });
      }

    },

    normalized_percentage : function(val, start, end) {
      return val/(end - start);
    },

    normalized_value : function(val, start, end, step) {
      var range = end - start,
          step = step,
          point = val*range,
          mod = (point-(point%step)) / step,
          rem = point % step,
          round = ( rem >= step*0.5 ? step : 0);
      return (mod*step + round);
    },

    set_translate : function(ele, offset, vertical) {
      if (vertical) {
        $(ele)
          .css('-webkit-transform', 'translateY('+offset+'px)')
          .css('-moz-transform', 'translateY('+offset+'px)')
          .css('-ms-transform', 'translateY('+offset+'px)')
          .css('-o-transform', 'translateY('+offset+'px)')
          .css('transform', 'translateY('+offset+'px)');
      } else {
        $(ele)
          .css('-webkit-transform', 'translateX('+offset+'px)')
          .css('-moz-transform', 'translateX('+offset+'px)')
          .css('-ms-transform', 'translateX('+offset+'px)')
          .css('-o-transform', 'translateX('+offset+'px)')
          .css('transform', 'translateX('+offset+'px)');
      }
    },

    limit_to : function(val, min, max) {
      return Math.min(Math.max(val, min), max);
    },

    initialize_settings : function(handle) {
      $.data(handle, 'bar', $(handle).parent());
      $.data(handle, 'bar_o', $(handle).parent().offset().left);
      $.data(handle, 'bar_w', $(handle).parent().outerWidth());
      $.data(handle, 'handle_o', $(handle).offset().left);
      $.data(handle, 'handle_w', $(handle).outerWidth());
      $.data(handle, 'settings', $.extend({}, this.settings, this.data_options($(handle).parent())));
    },

    set_initial_position : function($ele) {
      var settings = $.data($ele.children('.range-slider-handle')[0], 'settings'),
          initial = (!!settings.initial ? settings.initial : Math.floor((settings.end-settings.start)*0.5/settings.step)*settings.step),
          $handle = $ele.children('.range-slider-handle');
      this.set_ui($handle, initial);
    },

    set_value : function(value) {
      var self = this;
      $('[' + self.attr_name() + ']', this.scope).each(function(){
        $(this).attr(self.attr_name(), value);
      });
      if (!!$(this.scope).attr(self.attr_name())) {
        $(this.scope).attr(self.attr_name(), value);
      }
      self.reflow();
    },

    reflow : function() {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function() {
        var handle = $(this).children('.range-slider-handle')[0],
            val = $(this).attr(self.attr_name());
        self.initialize_settings(handle);
        
        if (val) {
          self.set_ui($(handle), parseInt(val));
        } else {
          self.set_initial_position($(this));
        }
      });
    }

  };

}(jQuery, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      callback : function () {},
      deep_linking: false,
      scroll_to_content: true
    },

    default_tab_hashes: [],

    init : function (scope, method, options) {
      var self = this,
          S = this.S;

      this.bindings(method, options);
      this.handle_location_hash_change();

      // Store the default active tabs which will be referenced when the
      // location hash is absent, as in the case of navigating the tabs and
      // returning to the first viewing via the browser Back button.
      S('[' + this.attr_name() + '] > dd.active > a', this.scope).each(function () {
        self.default_tab_hashes.push(this.hash);
      });
    },

    events : function () {
      var self = this,
          S = this.S;

      // Click event: tab title
      S(this.scope).off('.tab').on('click.fndtn.tab', '[' + this.attr_name() + '] > dd > a', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.toggle_active_tab(S(this).parent());
      });

      // Location hash change event
      S(window).on('hashchange.fndtn.tab', function (e) {
        e.preventDefault();
        self.handle_location_hash_change();
      });
    },

    handle_location_hash_change : function () {
      var self = this,
          S = this.S;

      S('[' + this.attr_name() + ']', this.scope).each(function () {
        var settings = S(this).data(self.attr_name(true) + '-init');
        if (settings.deep_linking) {
          // Match the location hash to a label
          var hash = self.scope.location.hash;
          if (hash != '') {
            // Check whether the location hash references a tab content div or
            // another element on the page (inside or outside the tab content div)
            var hash_element = S(hash);
            if (hash_element.hasClass('content') && hash_element.parent().hasClass('tab-content')) {
              // Tab content div
              self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=' + hash + ']').parent());
            } else {
              // Not the tab content div. If inside the tab content, find the
              // containing tab and toggle it as active.
              var hash_tab_container_id = hash_element.closest('.content').attr('id');
              if (hash_tab_container_id != undefined) {
                self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=#' + hash_tab_container_id + ']').parent(), hash);
              }
            }
          } else {
            // Reference the default tab hashes which were initialized in the init function
            for (var ind in self.default_tab_hashes) {
              self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=' + self.default_tab_hashes[ind] + ']').parent());
            }
          }
        }
       });
     },

    toggle_active_tab: function (tab, location_hash) {
      var S = this.S,
          tabs = tab.closest('[' + this.attr_name() + ']'),
          anchor = tab.children('a').first(),
          target_hash = '#' + anchor.attr('href').split('#')[1],
          target = S(target_hash),
          siblings = tab.siblings(),
          settings = tabs.data(this.attr_name(true) + '-init');

      // allow usage of data-tab-content attribute instead of href
      if (S(this).data(this.data_attr('tab-content'))) {
        target_hash = '#' + S(this).data(this.data_attr('tab-content')).split('#')[1];
        target = S(target_hash);
      }

      if (settings.deep_linking) {
        // Get the scroll Y position prior to moving to the hash ID
        var cur_ypos = $('body,html').scrollTop();

        // Update the location hash to preserve browser history
        // Note that the hash does not need to correspond to the
        // tab content ID anchor; it can be an ID inside or outside of the tab
        // content div.
        if (location_hash != undefined) {
          window.location.hash = location_hash;
        } else {
          window.location.hash = target_hash;
        }

        if (settings.scroll_to_content) {
          // If the user is requesting the content of a tab, then scroll to the
          // top of the title area; otherwise, scroll to the element within
          // the content area as defined by the hash value.
          if (location_hash == undefined || location_hash == target_hash) {
            tab.parent()[0].scrollIntoView();
          } else {
            S(target_hash)[0].scrollIntoView();
          }
        } else {
          // Adjust the scrollbar to the Y position prior to setting the hash
          // Only do this for the tab content anchor, otherwise there will be
          // conflicts with in-tab anchor links nested in the tab-content div
          if (location_hash == undefined || location_hash == target_hash) {
            $('body,html').scrollTop(cur_ypos);
          }
        }
      }

      // WARNING: The activation and deactivation of the tab content must
      // occur after the deep linking in order to properly refresh the browser
      // window (notably in Chrome).
      tab.addClass(settings.active_class).triggerHandler('opened');
      siblings.removeClass(settings.active_class);
      target.siblings().removeClass(settings.active_class).end().addClass(settings.active_class);
      settings.callback(tab);
      target.triggerHandler('toggled', [tab]);
      tabs.triggerHandler('toggled', [target]);
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltip = {
    name : 'tooltip',

    version : '5.2.1',

    settings : {
      additional_inheritable_classes : [],
      tooltip_class : '.tooltip',
      append_to: 'body',
      touch_close_text: 'Tap To Close',
      disable_for_touch: false,
      hover_delay: 200,
      tip_template : function (selector, content) {
        return '<span data-selector="' + selector + '" class="'
          + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
          + '">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'random_str');
      this.bindings(method, options);
    },

    events : function (instance) {
      var self = this,
          S = self.S;

      self.create(this.S(instance));

      $(this.scope)
        .off('.tooltip')
        .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip',
          '[' + this.attr_name() + ']:not(a)', function (e) {
          var $this = S(this),
              settings = $.extend({}, self.settings, self.data_options($this)),
              is_touch = false;

          if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;

          if ($this.hasClass('open')) {
            if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) e.preventDefault();
            self.hide($this);
          } else {
            if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              return;
            } else if(!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              e.preventDefault();
              S(settings.tooltip_class + '.open').hide();
              is_touch = true;
            }

            if (/enter|over/i.test(e.type)) {
              this.timer = setTimeout(function () {
                var tip = self.showTip($this);
              }.bind(this), self.settings.hover_delay);
            } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
              clearTimeout(this.timer);
              self.hide($this);
            } else {
              self.showTip($this);
            }
          }
        })
        .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (e) {
          if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;

          if($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
            return;
          }
          else if($(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(e.type)) {
            self.convert_to_touch($(this));
          } else {
            self.hide($(this));
          }
        })
        .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (e) {
          self.hide(S(this));
        });
    },

    ie_touch : function (e) {
      // How do I distinguish between IE11 and Windows Phone 8?????
      return false;
    },

    showTip : function ($target) {
      var $tip = this.getTip($target);

        return this.show($target);
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip = null;

      if (selector) {
        tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var id = $target.attr('id'),
          dataSelector = $target.attr(this.attr_name()) || $target.attr('data-selector');

      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
        dataSelector = this.random_str(6);
        $target.attr('data-selector', dataSelector);
      }

      return (id && id.length > 0) ? id : dataSelector;
    },

    create : function ($target) {
      var self = this,
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip_template = this.settings.tip_template;

      if (typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template)) {
        tip_template = window[settings.tip_template];
      }

      var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(settings.append_to);

      if (Modernizr.touch) {
        $tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');
        $tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function(e) {
          self.hide($target);
        });
      }

      $target.removeAttr('title').attr('title','');
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerHeight();

      if (this.small()) {
        tip.css({'width' : '100%' });
      } else {
        tip.css({'width' : (width) ? width : 'auto'});
      }

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto',
        }).end();
      };

      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left);

      if (this.small()) {
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          nub.addClass('rtl');
          left = target.offset().left + target.outerWidth() - tip.outerWidth();
        }
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', left);
        tip.removeClass('tip-override');
        if (classes && classes.indexOf('tip-top') > -1) {
          if (Foundation.rtl) nub.addClass('rtl');
          objPos(tip, (target.offset().top - tip.outerHeight()), 'auto', 'auto', left)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left - tip.outerWidth() - nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left + target.outerWidth() + nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches;
    },

    inheritable_classes : function ($target) {
      var settings = $.extend({}, this.settings, this.data_options($target)),
          inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(settings.additional_inheritable_classes),
          classes = $target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    convert_to_touch : function($target) {
      var self = this,
          $tip = self.getTip($target),
          settings = $.extend({}, self.settings, self.data_options($target));

      if ($tip.find('.tap-to-close').length === 0) {
        $tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');
        $tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function(e) {
          self.hide($target);
        });
      }

      $target.data('tooltip-open-event-type', 'touch');
    },

    show : function ($target) {
      var $tip = this.getTip($target);

      if ($target.data('tooltip-open-event-type') == 'touch') {
        this.convert_to_touch($target);
      }

      this.reposition($target, $tip, $target.attr('class'));
      $target.addClass('open');
      $tip.fadeIn(150);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);

      $tip.fadeOut(150, function() {
        $tip.find('.tap-to-close').remove();
        $tip.off('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
        $target.removeClass('open');
      });
    },

    off : function () {
      var self = this;
      this.S(this.scope).off('.fndtn.tooltip');
      this.S(this.settings.tooltip_class).each(function (i) {
        $('[' + self.attr_name() + ']').get(i).attr('title', $(this).text());
      }).remove();
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version: '5.2.1',

    settings : {
      index : 0,
      sticky_class : 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      is_hover: true,
      mobile_show_parent_link: false,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all'
    },

    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section', this),
            titlebar = topbar.children().filter('ul').first();
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();
        if(topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) self.assemble(topbar);

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        }

        // Pad body when sticky (scrolled) or fixed.
        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });

    },

    is_sticky: function (topbar, topbarContainer, settings) {
      var sticky = topbarContainer.hasClass(settings.sticky_class);

      if (sticky && settings.sticky_on === 'all') {
        return true;
      } else if (sticky && this.small() && settings.sticky_on === 'small') {
        return true;
      } else if (sticky && this.medium() && settings.sticky_on === 'medium') {
        return true;
      } else if (sticky && this.large() && settings.sticky_on === 'large') {
        return true;
      }

      return false;
    },

    toggle: function (toggleEl) {
      var self = this;

      if (toggleEl) {
        var topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        var topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left: '0%'});
          $('>.name', section).css({left: '100%'});
        } else {
          section.css({right: '0%'});
          $('>.name', section).css({right: '100%'});
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);

        topbar
          .toggleClass('expanded')
          .css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');

            window.scrollTo(0,0);
          } else {
              topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if(self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if(topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },

    timer : null,

    events : function (bar) {
      var self = this,
          S = this.S;

      S(this.scope)
        .off('.topbar')
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
          e.preventDefault();
          self.toggle(this);
        })
        .on('click.fndtn.topbar','.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]',function (e) {
            var li = $(this).closest('li');
            if(self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown'))
            {
            self.toggle();
            }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if(target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) return;
          if (settings.is_hover && !Modernizr.touch) return;

          e.stopImmediatePropagation();

          if (li.hasClass('hover')) {
            li
              .removeClass('hover')
              .find('li')
              .removeClass('hover');

            li.parents('li.hover')
              .removeClass('hover');
          } else {
            li.addClass('hover');

            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
              e.preventDefault();
            }
          }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
          if (self.breakpoint()) {

            e.preventDefault();

            var $this = S(this),
                topbar = $this.closest('[' + self.attr_name() + ']'),
                section = topbar.find('section, .section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
            } else {
              section.css({right: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });
      
      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize');

      S('body').off('.topbar').on('click.fndtn.topbar touchstart.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li').removeClass('hover');
      });

      // Go up a level on Click
      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
        } else {
          section.css({right: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });
    },

    resize : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar
            .css('height', '')
            .removeClass('expanded')
            .find('li')
            .removeClass('hover');

            if(doToggle) {
              self.toggle(topbar);
            }
        }

        if(self.is_sticky(topbar, stickyContainer, settings)) {
          if(stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if(self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }

      });
    },

    breakpoint : function () {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },

    small : function () {
      return matchMedia(Foundation.media_queries['small']).matches;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    assemble : function (topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section', topbar),
          titlebar = $(this).children().filter('ul').first();

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href');

        if (!$dropdown.find('.title.back').length) {
          if (settings.mobile_show_parent_link && url && url.length > 1) {
            var $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li><a class="parent-link js-generated" href="' + url + '">' + $link.text() +'</a></li>');
          } else {
            var $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');
          }
  
          // Copy link to subnav
          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
          }
          $dropdown.prepend($titleLi);
        }
      });

      // Put element back in the DOM
      section.appendTo(topbar);

      // check for sticky
      this.sticky();

      this.assembled(topbar);
    },

    assembled : function (topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled: true}));
    },

    height : function (ul) {
      var total = 0,
          self = this;

      $('> li', ul).each(function () { total += self.S(this).outerHeight(true); });

      return total;
    },

    sticky : function () {
      var $window = this.S(window),
          self = this;

      this.S(window).on('scroll', function() {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning: function() {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window), 
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset');
        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > (distance)) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },

    off : function () {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
