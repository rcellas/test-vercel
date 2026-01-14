import { describe, it, expect } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('src', 'test.jpg');
    fixture.componentRef.setInput('alt', 'Test Avatar');
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should render image with correct src and alt', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('alt', 'Rick Sanchez');
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    expect(img.getAttribute('alt')).toBe('Rick Sanchez');
  });

  it('should show fallback when image fails to load', () => {
    fixture.componentRef.setInput('src', 'invalid-url.jpg');
    fixture.componentRef.setInput('alt', 'Test');
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    
    expect(component.imageError()).toBe(true);
    const fallback = fixture.nativeElement.querySelector('.bg-gray-300');
    expect(fallback).toBeTruthy();
  });

  it('should have lazy loading attribute', () => {
    fixture.componentRef.setInput('src', 'test.jpg');
    fixture.componentRef.setInput('alt', 'Test');
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
