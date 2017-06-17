(load "~/quicklisp/setup.lisp")
(ql:quickload "cl-svg-polygon")
(write (cl-svg-polygon:parse-svg-file "rubbish-bin.svg"))
;; sbcl --script ./svgToPolygon.lisp
;; \((.+?) (.+?)\)