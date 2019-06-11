<?php
namespace bongTwigExtension;

use Craft;

class BongTwigExtension extends \Twig\Extension\AbstractExtension {
    
    public function getFunctions () {
        return [
            new \Twig\TwigFunction( 'cls', [ $this, 'cls' ] ),
            new \Twig\TwigFunction( 'bem', [ $this, 'bem' ] ),
            new \Twig\TwigFunction( 'style', [ $this, 'style' ] ),
            new \Twig\TwigFunction( 'srcset', [ $this, 'srcset' ] ),
            new \Twig\TwigFunction( 'attrs', [ $this, 'attrs' ] )
        ];
    }
    
    public function getFilters () {
        return [
            new \Twig\TwigFilter( 'index_by', [ $this, 'index_by' ] ),
            new \Twig\TwigFilter( 'filter_by', [ $this, 'filter_by' ] ),
            new \Twig\TwigFilter( 'compact', [ $this, 'compact' ] ),
            new \Twig\TwigFilter( 'pluck', [ $this, 'pluck' ] ),
        ];
    }
    
    private function is_sequential ( $arr ) {
        return array_keys( $arr ) === range( 0, count( $arr ) - 1 );
    }
    
    public function index_by( $arr, $key ) {
        $res = [];
        foreach ( $arr as $item ) {
            $res[ $item[ $key ] ] = $item;
        }
        return $res;
    }
    
    public function filter_by ( $arr, $key, $value = null ) {
        $res = [];
        if ( $value != null ) {
            foreach ( $arr as $item ) {
                if ( $item[ $key ] == $value ) $res []= $item;
            }
        } else {
            foreach ( $arr as $item ) {
                if ( $item[ $key ] ) $res []= $item;
            }
        }
        return $res;
    }
    
    public function compact ( $arr ) {
        $res = [];
        foreach ( $arr as $item ) {
            if ( $item ) $res []= $item;
        }
        return $res;
    }
    
    public function pluck ( $arr, $key ) {
        $res = [];
        if ( is_array( $key ) ) {
            if ( $this -> is_sequential( $key ) ) {
                foreach ( $arr as $item ) {
                    $arr = [];
                    foreach ( $key as $k ) {
                        $arr[ $k ] = $item[ $k ];
                    }
                    $res []= $arr;
                }
            } else {
                foreach ( $arr as $item ) {
                    $arr = [];
                    foreach ( $key as $src => $dest ) {
                        $arr[ $dest ] = $item[ $src ];
                    }
                    $res []= $arr;
                }
            }
        } else {
            // Single key
            foreach ( $arr as $item ) {
                $res []= $item[ $key ];
            }
        }
        return $res;
    }
    
    public function without ( $arr, $keys ) {
        $res = [];
        foreach ( $arr as $key => $value ) {
            if ( !in_array( $key, $arr ) ) {
                $res[ $key ] = $arr[ $key ];
            }
        }
        return $res;
    }
    
    public function cls ( $dict ) {
        $classes = [];
        foreach ( $dict as $key => $value ) {
            if ( $value ) $classes []= $key;
        }
        return implode( ' ', $classes );
    }
    
    public function bem ( $be, $ms = [] ) {
        $classes = [ $be => true ];
        foreach ( $ms as $key => $value ) {
            $classes[ "$be--$key" ] = $value;
        }
        return $this -> cls( $classes );
    }
    
    public function style ( $dict ) {
        $style = [];
        foreach ( $dict as $key => $value ) {
            if ( $value === null or $value === false ) continue;
            $attrs []= "$key: $value";
        }
        return implode( '; ', $style );
    }
    
    public function srcset ( $asset, $ratio = null ) {
        $srcset = [];
        $transforms = Craft::$app->getAssetTransforms()->getAllTransforms();
        foreach ( $transforms as $transform ) {
            $tf = [
                'width' => min( $transform -> width, $asset -> width ),
                'quality' => $transform -> quality,
            ];
            if ( $ratio != null ) $tf[ 'height' ] = $tf[ 'width' ] * $ratio;
            $w = $asset->getWidth( $tf );
            if ( in_array( $w, $srcset ) ) continue;
            $url = $asset->getUrl( $tf );
            $srcset[ $w ] = $url . ' ' . $w . 'w';
        }
        return implode( ', ', array_values( $srcset ) );
    }
    
    public function attrs ( $dict ) {
        $attrs = [];
        foreach ( $dict as $key => $value ) {
            if ( $value === false || $value === null ) continue;
            if ( $key == 'style' && is_array( $value ) ) $value = $this -> style( $value );
            if ( $key == 'class' && is_array( $value ) ) $value = $this -> cls( $value );
            $attrs []= $value === true ? $value : "$key=$value";
        }
        return implode( ' ', $attrs );
    }
    
}

class Module extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace
        Craft::setAlias('@bong-twig-extension', __DIR__);
        
        parent::init();
        if (Craft::$app->request->getIsSiteRequest()) {
            $extension = new BongTwigExtension();
            Craft::$app->view->registerTwigExtension($extension);
        }
        
    }
}